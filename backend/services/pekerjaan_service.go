package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type PekerjaanService interface {
	Create(create *dto.PekerjaanCreate) (*dto.Pekerjaan, error)
	GetByPublicID(publicID uuid.UUID) (*dto.Pekerjaan, error)
	GetAll() ([]dto.Pekerjaan, error)
}

type PekerjaanServiceImpl struct {
	r repositories.RepoBase[models.Pekerjaan]
}

func (a *PekerjaanServiceImpl) Create(create *dto.PekerjaanCreate) (*dto.Pekerjaan, error) {
	gorm := &models.Pekerjaan{
		Nama: create.Nama,
	}

	data, err := a.r.Create(nil, gorm)

	if err != nil {
		return nil, err
	} else {
		return mapper.Map(data, mapper.ToPekerjaan), nil
	}
}

func (a *PekerjaanServiceImpl) GetAll() ([]dto.Pekerjaan, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToPekerjaan), nil
}

func (a *PekerjaanServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Pekerjaan, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToPekerjaan), nil
}

func NewPekerjaanService(r repositories.RepoBase[models.Pekerjaan]) PekerjaanService {
	return &PekerjaanServiceImpl{
		r: r,
	}
}
