package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToAlergiBase(model *models.Alergi) *dto.Alergi {
  dto := &dto.Alergi{
    Nama: model.Nama,
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  return dto
}
