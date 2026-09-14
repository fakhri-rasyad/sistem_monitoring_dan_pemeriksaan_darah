package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type RiwayatPenyakitService interface {
	Create(create *dto.RiwayatPenyakitCreate) (*dto.RiwayatPenyakit, error)
	GetByPublicID(publicID uuid.UUID) (*dto.RiwayatPenyakit, error)
	GetAll() ([]dto.RiwayatPenyakit, error)
	Delete(publicID uuid.UUID) error
}

type RiwayatPenyakitServiceImpl struct {
	r repositories.RepoBase[models.RiwayatPenyakit]
}

func (a *RiwayatPenyakitServiceImpl) Create(create *dto.RiwayatPenyakitCreate) (*dto.RiwayatPenyakit, error) {
	gorm := &models.RiwayatPenyakit{
		Nama: create.Nama,
	}

	data, err := a.r.Create(nil, gorm)

	if err != nil {
		return nil, err
	} else {
		return mapper.Map(data, mapper.ToRiwayatPenyakitBase), nil
	}
}

func (a *RiwayatPenyakitServiceImpl) GetAll() ([]dto.RiwayatPenyakit, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToRiwayatPenyakitBase), nil
}

func (a *RiwayatPenyakitServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.RiwayatPenyakit, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToRiwayatPenyakitBase), nil
}

func (a *RiwayatPenyakitServiceImpl) Delete(publicID uuid.UUID) error {
	riwayatPenyakit, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return err
	}

	if err = a.r.Delete(nil, riwayatPenyakit.InternalID); err != nil {
		return err
	}

	return nil
}

func NewRiwayatPenyakitService(r repositories.RepoBase[models.RiwayatPenyakit]) RiwayatPenyakitService {
	return &RiwayatPenyakitServiceImpl{
		r: r,
	}
}
