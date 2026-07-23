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
  pekerjaRepo repositories.PekerjaanRepoImpl
  pasienRepo repositories.PasienRepoImpl
  alergiRepo repositories.AlergiRepoImpl
  pantangRepo repositories.PantanganRepoImpl
  alrgPasRepo repositories.AlergiPasienRepoImpl
  pntgPasRepo repositories.PantanganPasienRepoImpl
  kunjungRepo repositories.KunjunganRepoImpl
  kompTubRepo repositories.KomposisiTubuhRepoImpl
  parametRepo repositories.ParameterPemeriksaanDarahImpl
  dataLabRepo repositories.DataLabRepoImpl
  pemerikRepo repositories.PemeriksaanRepoImpl
}

func NewSubmitService() SubmitService {
	return &SubmitServiceImpl{}
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
    for i := range submission.PantanganPasiens{
      err := s.resolvePantanganPasien(wf.tx, pasien.InternalID, &submission.PantanganPasiens[i])
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

  panic("Unimplemented")
}

func (s *SubmitServiceImpl) resolvePasien(tx *gorm.DB, ref *dto.PasienReference) (*models.Pasien ,error) {
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
    Nama: ref.Create.Nama,
    Alamat: ref.Create.Alamat,
    TempatLahir: ref.Create.TempatLahir,
    TanggalLahir: ref.Create.TanggalLahir,
    NomorHP: ref.Create.NomorHP,
    Email: ref.Create.Email,
    PekerjaanID: pekerjaan.InternalID,
  }

  data, err := s.pasienRepo.Create(tx, value)
  if err != nil {
    return nil, err
  }

  return data, nil
}

func (s *SubmitServiceImpl) resolveAlergiPasien(tx *gorm.DB, pasienID int, ref *dto.AlergiPasienCreate) (error) {
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

func (s *SubmitServiceImpl) resolvePantanganPasien(tx *gorm.DB, pasienID int, ref *dto.PantanganPasienCreate) (error) {
  alergi, err := s.pantangRepo.GetByPublicID(tx, ref.PantanganPublicID)

  if err != nil {
    return err
  }

  pantangPasien := &models.PantanganPasien{
    PasienID: pasienID,
    PantanganID: alergi.InternalID,
  }

  _, err = s.pntgPasRepo.Create(tx, pantangPasien)

  if err != nil {
    return err
  } else {
    return nil
  }
}

func (s *SubmitServiceImpl) resolveKunjungan(tx *gorm.DB, pasienID int, ref *dto.KunjunganCreate) (*models.Kunjungan ,error) {
  gormModel := &models.Kunjungan{
    Sistol: ref.Sistol,
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

func (s *SubmitServiceImpl) resolveKomposisiTubuh(tx *gorm.DB, kunjunganID int, ref *dto.KomposisiTubuhCreate) (error) {
  gormModel := &models.KomposisiTubuh{
    Berat: ref.Berat,
    Tinggi: ref.Tinggi,

    MassaOtot: ref.MassaOtot,
    MassaLemak: ref.MassaLemak,
    MassaTulang: ref.MassaTulang,

    AirTubuh: ref.AirTubuh,
    IndeksMassaTubh: ref.IndeksMassaTubh,

    KunjunganID: kunjunganID,
  }

  if _, err := s.kompTubRepo.Create(tx, gormModel); err != nil {
    return err
  } else {
    return nil
  }
}
