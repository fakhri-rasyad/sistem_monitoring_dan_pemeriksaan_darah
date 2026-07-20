package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPekerjaan(model *models.Pekerjaan) *dto.Pekerjaan {
  return &dto.Pekerjaan{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Nama: model.Nama,
  }
}
