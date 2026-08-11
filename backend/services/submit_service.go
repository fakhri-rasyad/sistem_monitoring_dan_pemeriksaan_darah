package services

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"
	"fmt"

	"gorm.io/gorm"
)

type SubmitService interface {
	Create(submission *dto.SubmissionCreate) error
}

type SubmitServiceImpl struct {
	pekerjaRepo repositories.RepoBase[models.Pekerjaan]
	pasienRepo  repositories.RepoBase[models.Pasien]
	alergiRepo  repositories.RepoBase[models.Alergi]
	pantangRepo repositories.RepoBase[models.Pantangan]
	alrgPasRepo repositories.RepoBase[models.AlergiPasiens]
	pntgPasRepo repositories.RepoBase[models.PantanganPasien]
	kunjungRepo repositories.RepoBase[models.Kunjungan]
	kompTubRepo repositories.RepoBase[models.KomposisiTubuh]
	parametRepo repositories.RepoBase[models.ParameterPemeriksaanDarah]
	dataLabRepo repositories.RepoBase[models.DataLab]
	pemerikRepo repositories.RepoBase[models.Pemeriksaan]
}

func NewSubmitService(
	pekerjaRepo repositories.RepoBase[models.Pekerjaan],
	pasienRepo repositories.RepoBase[models.Pasien],
	alergiRepo repositories.RepoBase[models.Alergi],
	pantangRepo repositories.RepoBase[models.Pantangan],
	alrgPasRepo repositories.RepoBase[models.AlergiPasiens],
	pntgPasRepo repositories.RepoBase[models.PantanganPasien],
	kunjungRepo repositories.RepoBase[models.Kunjungan],
	kompTubRepo repositories.RepoBase[models.KomposisiTubuh],
	parametRepo repositories.RepoBase[models.ParameterPemeriksaanDarah],
	dataLabRepo repositories.RepoBase[models.DataLab],
	pemerikRepo repositories.RepoBase[models.Pemeriksaan],
) SubmitService {
	return &SubmitServiceImpl{
		pekerjaRepo: pekerjaRepo,
		pasienRepo:  pasienRepo,
		alergiRepo:  alergiRepo,
		pantangRepo: pantangRepo,
		alrgPasRepo: alrgPasRepo,
		pntgPasRepo: pntgPasRepo,
		kunjungRepo: kunjungRepo,
		kompTubRepo: kompTubRepo,
		parametRepo: parametRepo,
		dataLabRepo: dataLabRepo,
		pemerikRepo: pemerikRepo,
	}
}

func (s *SubmitServiceImpl) Create(submission *dto.SubmissionCreate) error {
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

	if err.Error() == "duplicate data" {
		return nil
	} else if err != nil {
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

	if err.Error() == "duplicate data" {
		return nil
	} else if err != nil {
		return err
	} else {
		return nil
	}
}

func (s *SubmitServiceImpl) resolveKunjungan(tx *gorm.DB, pasienID int, ref *dto.KunjunganCreate) (*models.Kunjungan, error) {
	gormModel := &models.Kunjungan{
		Sistol:  ref.Sistol,
		Diastol: ref.Diastol,
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
