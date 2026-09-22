package services

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type SubmitService interface {
	FirstSubmissionCreation(submission *dto.SubmissionCreate) error
	LaterSubmissionCreation(submission *dto.KunjunganSubmission) error
	UpdateKunjungan(update *dto.KunjunganUpdate) error
}

type SubmitServiceImpl struct {
	pekerjaRepo     repositories.RepoBase[models.Pekerjaan]
	pasienRepo      repositories.RepoBase[models.Pasien]
	alergiRepo      repositories.RepoBase[models.Alergi]
	pantangRepo     repositories.RepoBase[models.Pantangan]
	rwytPyktRepo    repositories.RepoBase[models.RiwayatPenyakit]
	alrgPasRepo     repositories.RepoBase[models.AlergiPasiens]
	pntgPasRepo     repositories.RepoBase[models.PantanganPasien]
	rwytPyktPasRepo repositories.RepoBase[models.RiwayatPenyakitPasien]
	kunjungRepo     repositories.KunjunganRepoImpl
	kompTubRepo     repositories.RepoBase[models.KomposisiTubuh]
	parametRepo     repositories.RepoBase[models.ParameterPemeriksaanDarah]
	dataLabRepo     repositories.DataLabRepoImpl
	pemerikRepo     repositories.RepoBase[models.Pemeriksaan]
	tagihanRepo     repositories.TagihanRepo
}

func NewSubmitService(
	pekerjaRepo repositories.RepoBase[models.Pekerjaan],
	pasienRepo repositories.RepoBase[models.Pasien],
	alergiRepo repositories.RepoBase[models.Alergi],
	pantangRepo repositories.RepoBase[models.Pantangan],
	rwytPyktRepo repositories.RepoBase[models.RiwayatPenyakit],
	alrgPasRepo repositories.RepoBase[models.AlergiPasiens],
	pntgPasRepo repositories.RepoBase[models.PantanganPasien],
	rwytPyktPasRepo repositories.RepoBase[models.RiwayatPenyakitPasien],
	kunjungRepo repositories.KunjunganRepoImpl,
	kompTubRepo repositories.RepoBase[models.KomposisiTubuh],
	parametRepo repositories.RepoBase[models.ParameterPemeriksaanDarah],
	dataLabRepo repositories.DataLabRepoImpl,
	pemerikRepo repositories.RepoBase[models.Pemeriksaan],
	tagihanRepo repositories.TagihanRepo,
) SubmitService {
	return &SubmitServiceImpl{
		pekerjaRepo:     pekerjaRepo,
		pasienRepo:      pasienRepo,
		alergiRepo:      alergiRepo,
		pantangRepo:     pantangRepo,
		rwytPyktRepo:    rwytPyktRepo,
		alrgPasRepo:     alrgPasRepo,
		pntgPasRepo:     pntgPasRepo,
		rwytPyktPasRepo: rwytPyktPasRepo,
		kunjungRepo:     kunjungRepo,
		kompTubRepo:     kompTubRepo,
		parametRepo:     parametRepo,
		dataLabRepo:     dataLabRepo,
		pemerikRepo:     pemerikRepo,
		tagihanRepo:     tagihanRepo,
	}
}

func (s *SubmitServiceImpl) UpdateKunjungan(update *dto.KunjunganUpdate) error {
	wf := beginWorkflow()

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			wf.Rollback()
		}
	}()

	kunjungan, err := s.kunjungRepo.GetDetailWithPreload(wf.tx, update.KunjunganPubID)

	if err != nil {
		return err
	}

	if err = s.UpdateKunjunganDetail(wf.tx, kunjungan, update.Kunjungan); err != nil {
		return err
	}

	if err = s.UpdateKomposisiButuh(wf.tx, kunjungan.KomposisiTubuh.PublicID, update.KomposisiTubuh); err != nil {
		return err
	}

	if err = s.UpdatePemeriksaan(wf.tx, kunjungan.Pemeriksaan.PublicID, update.Pemeriksaan); err != nil {
		return err
	}

	if err = s.UpdateTagihan(wf.tx, kunjungan.Tagihan, update.Tagihan); err != nil {
		return err
	}

	if err = s.UpdateDataLab(wf.tx, kunjungan.InternalID, update.DataLabs); err != nil {
		return err
	}

	if err = wf.Commit(); err != nil {
		return err
	}
	return nil

}

func (s *SubmitServiceImpl) UpdateKunjunganDetail(tx *gorm.DB, kunjungan *models.Kunjungan, update dto.KunjunganCreate) error {

	kunjungan.Tanggal = update.Tanggal
	kunjungan.Tensi = update.Tensi

	if err := s.kunjungRepo.Update(tx, kunjungan); err != nil {
		return err
	}

	return nil
}

func (s *SubmitServiceImpl) UpdateKomposisiButuh(tx *gorm.DB, komposisiPubID uuid.UUID, update dto.KomposisiTubuhCreate) error {
	kompos, err := s.kompTubRepo.GetByPublicID(tx, komposisiPubID)

	if err != nil {
		return err
	}

	kompos.Berat = update.Berat
	kompos.Tinggi = update.Tinggi

	kompos.MassaLemak = update.MassaLemak
	kompos.MassaOtot = update.MassaOtot
	kompos.MassaTulang = update.MassaTulang

	kompos.AirTubuh = update.AirTubuh
	kompos.IndeksMassaTubh = update.IndeksMassaTubh

	if err := s.kompTubRepo.Update(tx, kompos); err != nil {
		return err
	}

	return nil
}

func (s *SubmitServiceImpl) UpdatePemeriksaan(tx *gorm.DB, pemeriksaanPublidID uuid.UUID, update dto.PemeriksaanCreate) error {
	pemeriksaan, err := s.pemerikRepo.GetByPublicID(tx, pemeriksaanPublidID)

	if err != nil {
		return err
	}

	pemeriksaan.Subjective = update.Subjective
	pemeriksaan.Objective = update.Objective
	pemeriksaan.PlanningTerapi = update.PlanningTerapi
	pemeriksaan.Evaluasi = update.Evaluasi
	pemeriksaan.DiperiksaAt = update.DiperiksaAt

	err = s.pemerikRepo.Update(tx, pemeriksaan)

	if err != nil {
		return err
	}
	return nil
}

func (s *SubmitServiceImpl) UpdateTagihan(tx *gorm.DB, tagihan *models.Tagihan, update dto.TagihanCreate) error {
	tagihan.BiayaAlat = update.BiayaAlat
	tagihan.BiayaKonsultasi = update.BiayaKonsultasi
	tagihan.MetodeBayar = update.MetodeBayar

	if err := s.tagihanRepo.Update(tx, tagihan); err != nil {
		return err
	}

	return nil
}

func (s *SubmitServiceImpl) UpdateDataLab(tx *gorm.DB, kunjunganID int, update []dto.DataLabCreate) error {
	if err := s.dataLabRepo.BatchDelete(tx, kunjunganID); err != nil {
		return err
	}

	for _, item := range update {
		parameter, err := s.parametRepo.GetByPublicID(tx, item.ParameterPublicID)

		if err != nil {
			return err
		}

		gormModel := &models.DataLab{
			Nilai:       item.Nilai,
			KunjunganID: kunjunganID,
			ParameterID: parameter.InternalID,
		}

		_, err = s.dataLabRepo.Create(tx, gormModel)
		if err != nil {
			return err
		}

	}
	return nil
}

func (s *SubmitServiceImpl) LaterSubmissionCreation(submission *dto.KunjunganSubmission) error {
	wf := beginWorkflow()

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			wf.Rollback()
		}
	}()

	pasienUid, err := uuid.Parse(submission.PasienPublicID)

	if err != nil {
		wf.Rollback()
		return err
	}

	pasien, err := s.pasienRepo.GetByPublicID(wf.tx, pasienUid)

	if err != nil {
		wf.Rollback()
		return err
	}

	kunjungan, err := s.resolveKunjungan(wf.tx, pasien.InternalID, &submission.Kunjungan)

	if err != nil {
		wf.Rollback()
		return err
	}

	if err := s.resolveKomposisiTubuh(wf.tx, kunjungan.InternalID, &submission.KomposisiTubuh); err != nil {
		wf.Rollback()
		return err
	}

	if len(submission.DataLabs) != 0 {
		for i := range submission.DataLabs {
			err := s.resolveDataLab(wf.tx, kunjungan.InternalID, &submission.DataLabs[i])
			if err != nil {
				wf.Rollback()
				return err
			}
		}
	}

	if err := s.resolvePemeriksaan(wf.tx, kunjungan.InternalID, &submission.Pemeriksaan); err != nil {
		wf.Rollback()
		return err
	}

	if err := s.resolveTagihan(wf.tx, kunjungan.InternalID, &submission.Tagihan); err != nil {
		wf.Rollback()
		return err
	}

	if err := wf.Commit(); err != nil {
		return err
	}
	return nil
}

func (s *SubmitServiceImpl) FirstSubmissionCreation(submission *dto.SubmissionCreate) error {
	wf := beginWorkflow()

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			wf.Rollback()
		}
	}()

	pasien, err := s.resolvePasien(wf.tx, &submission.Pasien)
	if err != nil {
		wf.Rollback()
		return err
	}

	if len(submission.AlergiPasiens) != 0 {
		for i := range submission.AlergiPasiens {
			err := s.resolveAlergiPasien(wf.tx, pasien.InternalID, &submission.AlergiPasiens[i])
			if err != nil {
				wf.Rollback()
				return err
			}
		}
	}

	if len(submission.PantanganPasiens) != 0 {
		for i := range submission.PantanganPasiens {
			err := s.resolvePantanganPasien(wf.tx, pasien.InternalID, &submission.PantanganPasiens[i])
			if err != nil {
				wf.Rollback()
				return err
			}
		}
	}

	if len(submission.RiwayatPenyakitPasiens) != 0 {
		for i := range submission.RiwayatPenyakitPasiens {
			err := s.resolveRiwayatPenyakitPasien(wf.tx, pasien.InternalID, &submission.RiwayatPenyakitPasiens[i])
			if err != nil {
				return err
			}
		}
	}

	kunjungan, err := s.resolveKunjungan(wf.tx, pasien.InternalID, &submission.Kunjungan)

	if err != nil {
		wf.Rollback()
		return err
	}

	if err := s.resolveKomposisiTubuh(wf.tx, kunjungan.InternalID, &submission.KomposisiTubuh); err != nil {
		wf.Rollback()
		return err
	}

	if len(submission.DataLabs) != 0 {
		for i := range submission.DataLabs {
			err := s.resolveDataLab(wf.tx, kunjungan.InternalID, &submission.DataLabs[i])
			if err != nil {
				wf.Rollback()
				return err
			}
		}
	}

	if err := s.resolvePemeriksaan(wf.tx, kunjungan.InternalID, &submission.Pemeriksaan); err != nil {
		wf.Rollback()
		return err
	}

	if err := s.resolveTagihan(wf.tx, kunjungan.InternalID, &submission.Tagihan); err != nil {
		wf.Rollback()
		return err
	}

	if err := wf.Commit(); err != nil {
		return err
	}
	return nil
}

func (s *SubmitServiceImpl) resolvePasien(tx *gorm.DB, ref *dto.PasienReference) (*models.Pasien, error) {
	if ref.PublicID != nil {
		return s.pasienRepo.GetByPublicID(tx, *ref.PublicID)
	}

	if ref.Create == nil {
		return nil, errors.New("Data pasien tidak bisa kosong")
	}

	pekerjaan, err := s.pekerjaRepo.GetByPublicID(tx, ref.Create.PekerjaanPublicID)

	if err != nil {
		return nil, err
	}

	value := &models.Pasien{
		Nama:         ref.Create.Nama,
		Alamat:       ref.Create.Alamat,
		TempatLahir:  ref.Create.TempatLahir,
		TanggalLahir: ref.Create.TanggalLahir,
		NomorHP:      ref.Create.NomorHP,
		Email:        ref.Create.Email,
		PekerjaanID:  pekerjaan.InternalID,
	}

	data, err := s.pasienRepo.Create(tx, value)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SubmitServiceImpl) resolveAlergiPasien(tx *gorm.DB, pasienID int, ref *dto.AlergiPasienCreate) error {
	alergi, err := s.alergiRepo.GetByPublicID(tx, ref.AlergiPublicID)

	if err != nil {
		return err
	}

	alergiPasien := &models.AlergiPasiens{
		PasienID: pasienID,
		AlergiID: alergi.InternalID,
	}

	_, err = s.alrgPasRepo.Create(tx, alergiPasien)

	if err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolvePantanganPasien(tx *gorm.DB, pasienID int, ref *dto.PantanganPasienCreate) error {
	alergi, err := s.pantangRepo.GetByPublicID(tx, ref.PantanganPublicID)

	if err != nil {
		return err
	}

	pantangPasien := &models.PantanganPasien{
		PasienID:    pasienID,
		PantanganID: alergi.InternalID,
	}

	_, err = s.pntgPasRepo.Create(tx, pantangPasien)

	if err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolveRiwayatPenyakitPasien(tx *gorm.DB, pasienID int, ref *dto.RiwayatPenyakitPasienCreate) error {
	riwayatPenyakit, err := s.rwytPyktRepo.GetByPublicID(tx, ref.RiwayatPenyakitPublicID)

	if err != nil {
		return err
	}

	model := &models.RiwayatPenyakitPasien{
		PasienID:          pasienID,
		RiwayatPenyakitID: riwayatPenyakit.InternalID,
	}

	_, err = s.rwytPyktPasRepo.Create(tx, model)

	if err != nil {
		return err
	}

	return nil
}

func (s *SubmitServiceImpl) resolveKunjungan(tx *gorm.DB, pasienID int, ref *dto.KunjunganCreate) (*models.Kunjungan, error) {
	gormModel := &models.Kunjungan{
		Tensi:   ref.Tensi,
		Tanggal: ref.Tanggal,

		PasienID: pasienID,
	}

	model, err := s.kunjungRepo.Create(tx, gormModel)

	if err != nil {
		return nil, err
	}

	return model, nil
}

func (s *SubmitServiceImpl) resolveKomposisiTubuh(tx *gorm.DB, kunjunganID int, ref *dto.KomposisiTubuhCreate) error {
	gormModel := &models.KomposisiTubuh{
		Berat:  ref.Berat,
		Tinggi: ref.Tinggi,

		MassaOtot:   ref.MassaOtot,
		MassaLemak:  ref.MassaLemak,
		MassaTulang: ref.MassaTulang,

		AirTubuh:        ref.AirTubuh,
		IndeksMassaTubh: ref.IndeksMassaTubh,

		KunjunganID: kunjunganID,
	}

	if _, err := s.kompTubRepo.Create(tx, gormModel); err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolveDataLab(tx *gorm.DB, kunjunganID int, ref *dto.DataLabCreate) error {
	parameter, err := s.parametRepo.GetByPublicID(tx, ref.ParameterPublicID)

	if err != nil {
		return err
	}

	gormModel := &models.DataLab{
		Nilai:       ref.Nilai,
		KunjunganID: kunjunganID,
		ParameterID: parameter.InternalID,
	}

	_, err = s.dataLabRepo.Create(tx, gormModel)
	if err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolvePemeriksaan(tx *gorm.DB, kunjunganID int, ref *dto.PemeriksaanCreate) error {
	gormModel := &models.Pemeriksaan{
		Subjective:     ref.Subjective,
		Objective:      ref.Objective,
		PlanningTerapi: ref.PlanningTerapi,
		Evaluasi:       ref.Evaluasi,
		DiperiksaAt:    ref.DiperiksaAt,

		KunjunganID: kunjunganID,
	}

	_, err := s.pemerikRepo.Create(tx, gormModel)

	if err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolveTagihan(tx *gorm.DB, kunjunganID int, ref *dto.TagihanCreate) error {
	gormModel := mapper.Map(ref, mapper.ToTagihanModel)
	gormModel.KunjunganID = kunjunganID

	_, err := s.tagihanRepo.Create(tx, gormModel)

	if err != nil {
		return err
	} else {
		return nil
	}
}
