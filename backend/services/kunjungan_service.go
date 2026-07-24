package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"

	"github.com/google/uuid"
)

type KunjunganService interface {
	GetByPublicID(publicID uuid.UUID) (*dto.Kunjungan, error)
}

type KunjunganServiceImpl struct {
	r repositories.RepoBase[models.Kunjungan]
}


func (a *KunjunganServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Kunjungan, error) {
  data, err := a.r.GetByPublicID(nil, publicID)
  if err != nil {
    return nil, err
  }
  return mapper.Map(data, mapper.ToKunjungan), nil
}

func NewKunjunganService(r repositories.RepoBase[models.Kunjungan]) KunjunganService {
	return &KunjunganServiceImpl{
		r: r,
	}
}
