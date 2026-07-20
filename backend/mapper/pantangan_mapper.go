package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPantanganBase(model *models.Pantangan) *dto.Pantangan {
  dto := &dto.Pantangan{
    Nama: model.Nama,
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  return dto

}
