package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type PantanganService interface {
	Create(create *dto.PantanganCreate) (*dto.Pantangan, error)
	GetByPublicID(publicID uuid.UUID) (*dto.Pantangan, error)
	GetAll() ([]dto.Pantangan, error)
}

type PantanganServiceImpl struct {
	r repositories.RepoBase[models.Pantangan]
}

func (a *PantanganServiceImpl) Create(create *dto.PantanganCreate) (*dto.Pantangan, error) {
	gorm := &models.Pantangan{
		Nama: create.Nama,
	}

	data, err := a.r.Create(nil, gorm)

	if err != nil {
		return nil, err
	} else {
		return mapper.Map(data, mapper.ToPantanganBase), nil
	}
}

func (a *PantanganServiceImpl) GetAll() ([]dto.Pantangan, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToPantanganBase), nil
}

func (a *PantanganServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Pantangan, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToPantanganBase), nil
}

func NewPantanganService(r repositories.RepoBase[models.Pantangan]) PantanganService {
	return &PantanganServiceImpl{
		r: r,
	}
}
