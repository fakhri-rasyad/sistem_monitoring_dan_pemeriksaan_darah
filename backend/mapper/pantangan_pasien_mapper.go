package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPantanganPasien(model *models.PantanganPasien) *dto.PantanganPasien {
  dto := &dto.PantanganPasien{
    Pantangan: *Map(&model.Pantangan, ToPantanganBase),
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  if pantangan := Map(&model.Pantangan, ToPantanganBase); pantangan != nil {
    dto.Pantangan = *pantangan
  }

  return dto
}
