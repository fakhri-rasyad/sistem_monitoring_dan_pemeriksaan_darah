package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToAlergiBase(model *models.Alergi) *dto.Alergi {
  return &dto.Alergi{
    DTOBase: *ToNewDTOBase(&model.ModelBase),
    Nama: model.Nama,
  }
}
