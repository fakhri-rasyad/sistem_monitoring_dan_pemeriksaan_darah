package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type KunjunganService interface {
	GetByPublicID(publicID uuid.UUID) (*dto.Kunjungan, error)
	GetAll() ([]dto.KunjunganWithPatient, error)
}

type KunjunganServiceImpl struct {
	r repositories.KunjunganRepoImpl
}

// GetAll implements [KunjunganService].
func (a *KunjunganServiceImpl) GetAll() ([]dto.KunjunganWithPatient, error) {
	data, err := a.r.GetAllWithPreload(nil)

	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToKunjunganWithPasien), nil
}

func (a *KunjunganServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Kunjungan, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}
	return mapper.Map(data, mapper.ToKunjungan), nil
}

func NewKunjunganService(r repositories.KunjunganRepoImpl) KunjunganService {
	return &KunjunganServiceImpl{
		r: r,
	}
}
