package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type ParameterPemeriksaanDarahService interface {
	Create(create *dto.ParameterPemeriksaanDarahCreate) (*dto.ParameterPemeriksaanDarah, error)
	GetByPublicID(publicID uuid.UUID) (*dto.ParameterPemeriksaanDarah, error)
	GetAll() ([]dto.ParameterPemeriksaanDarah, error)
}

type ParameterPemeriksaanDarahServiceImpl struct {
	r repositories.RepoBase[models.ParameterPemeriksaanDarah]
}

func (a *ParameterPemeriksaanDarahServiceImpl) Create(create *dto.ParameterPemeriksaanDarahCreate) (*dto.ParameterPemeriksaanDarah, error) {
	gorm := &models.ParameterPemeriksaanDarah{
		Nama:   create.Nama,
		Satuan: create.Satuan,
	}

	data, err := a.r.Create(nil, gorm)

	if err != nil {
		return nil, err
	} else {
		return mapper.Map(data, mapper.ToPPDarah), nil
	}
}

func (a *ParameterPemeriksaanDarahServiceImpl) GetAll() ([]dto.ParameterPemeriksaanDarah, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToPPDarah), nil
}

func (a *ParameterPemeriksaanDarahServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.ParameterPemeriksaanDarah, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToPPDarah), nil
}

func NewParameterPemeriksaanDarahService(r repositories.RepoBase[models.ParameterPemeriksaanDarah]) ParameterPemeriksaanDarahService {
	return &ParameterPemeriksaanDarahServiceImpl{
		r: r,
	}
}
