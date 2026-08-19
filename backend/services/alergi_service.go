package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type AlergiService interface {
	Create(create *dto.AlergiCreate) (*dto.Alergi, error)
	GetByPublicID(publicID uuid.UUID) (*dto.Alergi, error)
	GetAll() ([]dto.Alergi, error)
}

type AlergiServiceImpl struct {
	r repositories.RepoBase[models.Alergi]
}

func (a *AlergiServiceImpl) Create(create *dto.AlergiCreate) (*dto.Alergi, error) {
	gorm := &models.Alergi{
		Nama: create.Nama,
	}

	data, err := a.r.Create(nil, gorm)

	if err != nil {
		return nil, err
	} else {
		return mapper.Map(data, mapper.ToAlergiBase), nil
	}
}

func (a *AlergiServiceImpl) GetAll() ([]dto.Alergi, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToAlergiBase), nil
}

func (a *AlergiServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Alergi, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToAlergiBase), nil
}

func NewAlergiService(r repositories.RepoBase[models.Alergi]) AlergiService {
	return &AlergiServiceImpl{
		r: r,
	}
}
