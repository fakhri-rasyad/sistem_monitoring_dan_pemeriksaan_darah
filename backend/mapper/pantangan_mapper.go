package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPantanganBase(model *models.Pantangan) *dto.Pantangan {
  return &dto.Pantangan{
    DTOBase: *ToNewDTOBase(&model.ModelBase),
    Nama: model.Nama,
  }
}
