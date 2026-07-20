package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPantanganPasien(model *models.PantanganPasien) *dto.PantanganPasien {
  return &dto.PantanganPasien{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Pasien: *Map(&model.Pasien, ToPasien),
    Pantangan: *Map(&model.Pantangan, ToPantanganBase),
  }
}
