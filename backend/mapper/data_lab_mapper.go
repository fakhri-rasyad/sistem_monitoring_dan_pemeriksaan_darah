package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToDataLabBase(model *models.DataLab) *dto.DataLab {
  dto := &dto.DataLab{
    Nilai: model.Nilai,
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  if parameter := Map(&model.Parameter, ToPPDarah); parameter != nil {
    dto.Parameter = *parameter
  }

  return dto
}
