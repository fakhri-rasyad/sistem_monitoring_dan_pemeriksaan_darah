package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/xuri/excelize/v2"
)

type ExportService interface {
	ExportUser(public_id uuid.UUID) (*string, error)
}

type ExportServiceImpl struct {
	r repositories.PasienRepo
}

func NewExportService(r repositories.PasienRepo) ExportService {
	return &ExportServiceImpl{r: r}
}

func (s *ExportServiceImpl) ExportUser(public_id uuid.UUID) (*string, error) {
	user, err := s.r.ExportUserData(public_id)

	if err != nil {
		return nil, err
	}

	f := excelize.NewFile()

	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	if err := os.MkdirAll("./tmp", 0755); err != nil {
		return nil, err
	}

	style, err := f.NewStyle(&excelize.Style{
		Font: &excelize.Font{
			Bold:   true,
			Family: "Calibri",
			Size:   12,
			Color:  "000000",
		},
	})
	if err != nil {
		fmt.Println(err)
	}

	namaSheet1 := "Detail Pasien"

	f.SetSheetName(f.GetSheetName(0), namaSheet1)

	s.PopulateDetailPasien(f, namaSheet1, user, style)

	for i, kunjungan := range user.Kunjungan {
		sheetName := fmt.Sprintf("Kunjungan %d", i+1)

		_, err := f.NewSheet(sheetName)
		if err != nil {
			return nil, err
		}

		s.PopulateKunjungan(f, sheetName, &kunjungan, style)
	}

	waktu := time.Now()
	namaFile := fmt.Sprintf("./tmp/data_pasien_%s_%d_%s_%d.xlsx", strings.ReplaceAll(user.Nama, " ", "_"), waktu.Day(), waktu.Month(), waktu.Year())
	if err := f.SaveAs(namaFile); err != nil {
		return nil, err
	}

	return &namaFile, err
}

func (s *ExportServiceImpl) PopulateDetailPasien(
	f *excelize.File,
	namaSheet1 string,
	user *models.Pasien,
	style int,
) {
	f.SetCellValue(namaSheet1, "A1", "DETAIL PASIEN")
	f.SetCellStyle(namaSheet1, "A1", "A1", style)

	f.SetCellValue(namaSheet1, "A2", "Nama")
	f.SetCellValue(namaSheet1, "B2", user.Nama)

	f.SetCellValue(namaSheet1, "A3", "Alamat")
	f.SetCellValue(namaSheet1, "B3", user.Alamat)

	f.SetCellValue(namaSheet1, "A4", "Tempat Lahir")
	f.SetCellValue(namaSheet1, "B4", user.TempatLahir)

	f.SetCellValue(namaSheet1, "A5", "Tanggal Lahir")
	f.SetCellValue(namaSheet1, "B5", user.TanggalLahir)

	f.SetCellValue(namaSheet1, "A6", "Nomor Handphone")
	f.SetCellValue(namaSheet1, "B6", user.NomorHP)

	f.SetCellValue(namaSheet1, "A7", "Email")
	f.SetCellValue(namaSheet1, "B7", user.Email)

	f.SetCellValue(namaSheet1, "A8", "Pekerjaan")
	f.SetCellValue(namaSheet1, "B8", user.Pekerjaan.Nama)

	f.SetCellValue(namaSheet1, "D1", "ALERGI PASIEN")
	f.SetCellStyle(namaSheet1, "D1", "D1", style)

	f.SetCellValue(namaSheet1, "F1", "PANTANGAN PASIEN")
	f.SetCellStyle(namaSheet1, "F1", "F1", style)

	for i, val := range user.AlergiPasiens {
		cell := fmt.Sprintf("D%d", i+2)
		f.SetCellValue(namaSheet1, cell, val.Alergi.Nama)
	}

	for i, val := range user.PantanganPasien {
		cell := fmt.Sprintf("F%d", i+2)
		f.SetCellValue(namaSheet1, cell, val.Pantangan.Nama)
	}

	f.SetColWidth(namaSheet1, "A", "A", 25)
	f.SetColWidth(namaSheet1, "B", "B", 30)
	f.SetColWidth(namaSheet1, "D", "D", 15)
	f.SetColWidth(namaSheet1, "F", "F", 15)
}

func (s *ExportServiceImpl) PopulateKunjungan(
	f *excelize.File,
	sheetName string,
	kunjungan *models.Kunjungan,
	style int,
) error {

	f.SetCellValue(sheetName, "A1", "KUNJUNGAN")
	f.SetCellStyle(sheetName, "A1", "A1", style)

	f.SetCellValue(sheetName, "A2", "Tanggal")
	f.SetCellValue(sheetName, "B2", kunjungan.Tanggal)

	f.SetCellValue(sheetName, "A3", "Tensi")
	f.SetCellValue(sheetName, "B3", kunjungan.Tensi)

	f.SetCellValue(sheetName, "A5", "KOMPOSISI TUBUH")
	f.SetCellStyle(sheetName, "A5", "A5", style)

	f.SetCellValue(sheetName, "B5", "NILAI")
	f.SetCellStyle(sheetName, "B5", "B5", style)

	f.SetCellValue(sheetName, "C5", "SATUAN")
	f.SetCellStyle(sheetName, "C5", "C5", style)

	f.SetCellValue(sheetName, "A6", "Berat Badan")
	f.SetCellValue(sheetName, "B6", kunjungan.KomposisiTubuh.Berat)
	f.SetCellValue(sheetName, "C6", "Kg")

	f.SetCellValue(sheetName, "A7", "Tinggi Badan")
	f.SetCellValue(sheetName, "B7", kunjungan.KomposisiTubuh.Tinggi)
	f.SetCellValue(sheetName, "C7", "cm")

	f.SetCellValue(sheetName, "A8", "Massa Lemak")
	f.SetCellValue(sheetName, "B8", kunjungan.KomposisiTubuh.MassaLemak)
	f.SetCellValue(sheetName, "C8", "Kg")

	f.SetCellValue(sheetName, "A9", "Massa Otot")
	f.SetCellValue(sheetName, "B9", kunjungan.KomposisiTubuh.MassaOtot)
	f.SetCellValue(sheetName, "C9", "Kg")

	f.SetCellValue(sheetName, "A10", "Massa Tulang")
	f.SetCellValue(sheetName, "B10", kunjungan.KomposisiTubuh.MassaTulang)
	f.SetCellValue(sheetName, "C10", "Kg")

	f.SetCellValue(sheetName, "A11", "Air Tubuh")
	f.SetCellValue(sheetName, "B11", kunjungan.KomposisiTubuh.AirTubuh)
	f.SetCellValue(sheetName, "C11", "mL")

	f.SetCellValue(sheetName, "A12", "Indeks Massa Tubuh")
	f.SetCellValue(sheetName, "B12", kunjungan.KomposisiTubuh.IndeksMassaTubh)
	f.SetCellValue(sheetName, "C12", "kg/m²")

	f.SetCellValue(sheetName, "A14", "PEMERIKSAAN")
	f.SetCellStyle(sheetName, "A14", "A14", style)

	f.SetCellValue(sheetName, "A15", "Subjective")
	f.SetCellValue(sheetName, "B15", kunjungan.Pemeriksaan.Subjective)

	f.SetCellValue(sheetName, "A16", "Objective")
	f.SetCellValue(sheetName, "B16", kunjungan.Pemeriksaan.Objective)

	f.SetCellValue(sheetName, "A17", "Planning Terapi")
	f.SetCellValue(sheetName, "B17", kunjungan.Pemeriksaan.PlanningTerapi)

	f.SetCellValue(sheetName, "A18", "Evaluasi")
	f.SetCellValue(sheetName, "B18", kunjungan.Pemeriksaan.Evaluasi)

	f.SetCellValue(sheetName, "A19", "Diperiksa At")
	f.SetCellValue(sheetName, "B19", kunjungan.Pemeriksaan.DiperiksaAt)

	f.SetCellValue(sheetName, "A21", "DATA LABORATORIUM")
	f.SetCellStyle(sheetName, "A21", "A21", style)

	f.SetCellValue(sheetName, "A22", "Parameter")
	f.SetCellValue(sheetName, "B22", "Nilai")
	f.SetCellValue(sheetName, "C22", "Satuan")

	for i, dataLab := range kunjungan.DataLabs {
		row := i + 23

		f.SetCellValue(
			sheetName,
			fmt.Sprintf("A%d", row),
			dataLab.Parameter.Nama,
		)

		f.SetCellValue(
			sheetName,
			fmt.Sprintf("B%d", row),
			dataLab.Nilai,
		)

		f.SetCellValue(
			sheetName,
			fmt.Sprintf("C%d", row),
			dataLab.Parameter.Satuan,
		)
	}

	tagihanStartRow := 23 + len(kunjungan.DataLabs) + 2
	currencyStyle, err := f.NewStyle(&excelize.Style{NumFmt: 359})

	if err != nil {
		return err
	}

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow),
		"TAGIHAN",
	)

	f.SetCellStyle(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow),
		fmt.Sprintf("A%d", tagihanStartRow),
		style,
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow+1),
		"Biaya Konsultasi",
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+1),
		kunjungan.Tagihan.BiayaKonsultasi,
	)

	f.SetCellStyle(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+1),
		fmt.Sprintf("B%d", tagihanStartRow+1),
		currencyStyle,
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow+2),
		"Biaya Alat",
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+2),
		kunjungan.Tagihan.BiayaAlat,
	)

	f.SetCellStyle(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+2),
		fmt.Sprintf("B%d", tagihanStartRow+2),
		currencyStyle,
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow+3),
		"Metode Pembayaran",
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+3),
		kunjungan.Tagihan.MetodeBayar,
	)

	f.SetCellValue(
		sheetName,
		fmt.Sprintf("A%d", tagihanStartRow+4),
		"Total",
	)

	f.SetCellFormula(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+4),
		fmt.Sprintf(
			"=B%d+B%d",
			tagihanStartRow+1,
			tagihanStartRow+2,
		),
	)

	f.SetCellStyle(
		sheetName,
		fmt.Sprintf("B%d", tagihanStartRow+4),
		fmt.Sprintf("B%d", tagihanStartRow+4),
		currencyStyle,
	)

	f.SetColWidth(sheetName, "A", "A", 25)
	f.SetColWidth(sheetName, "B", "B", 30)
	f.SetColWidth(sheetName, "C", "C", 15)

	return nil
}
