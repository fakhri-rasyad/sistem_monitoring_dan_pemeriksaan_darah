package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type PasienService interface {
	Create(create *dto.PasienCreate) error
	GetByPublicID(publicID uuid.UUID) (*dto.Pasien, error)
  GetByPublicIDWithPreload(publicID uuid.UUID) (*dto.Pasien, error)
	GetAll() ([]dto.Pasien, error)
}

type PasienServiceImpl struct {
	r repositories.PasienRepo
  pr repositories.RepoBase[models.Pekerjaan]
}

func (a *PasienServiceImpl) Create(create *dto.PasienCreate) error {
  pekerjaan, err := a.pr.GetByPublicID(nil, create.PekerjaanPublicID)

  if err != nil {
    return err
  }

  gorm := &models.Pasien{
    Nama: create.Nama,
    Alamat: create.Alamat,
    TempatLahir: create.TempatLahir,
    TanggalLahir: create.TanggalLahir,
    NomorHP: create.NomorHP,
    Email: create.Email,
    PekerjaanID: pekerjaan.InternalID,

  }

  _, err = a.r.Create(nil, gorm)

  if err != nil{
    return err
  } else {
    return nil
  }
}

func (a *PasienServiceImpl) GetAll() ([]dto.Pasien, error) {
  data, err := a.r.GetAll(nil)
  if err != nil {
    return nil, err
  }

  return mapper.MapSlice(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Pasien, error) {
  data, err := a.r.GetByPublicID(nil, publicID)
  if err != nil {
    return nil, err
  }

  return mapper.Map(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) GetByPublicIDWithPreload(publicID uuid.UUID) (*dto.Pasien, error) {
  data, err := a.r.GetByPublicIDWithPreload(publicID)
  if err != nil {
    return nil, err
  }

  return mapper.Map(data, mapper.ToPasien), nil
}

func NewPasienService(
  r repositories.PasienRepo,
  pr repositories.RepoBase[models.Pekerjaan],
  ) PasienService {
	return &PasienServiceImpl{
		r: r,
    pr: pr,
	}
}
