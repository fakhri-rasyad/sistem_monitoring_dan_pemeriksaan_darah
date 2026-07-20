package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToAlergiPasienBase(model *models.AlergiPasiens) *dto.AlergiPasienBase {
	dto := &dto.AlergiPasienBase{}

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  if alergi := Map(&model.Alergi, ToAlergiBase); alergi != nil {
    dto.Alergi = *alergi
  }

  return dto
}
