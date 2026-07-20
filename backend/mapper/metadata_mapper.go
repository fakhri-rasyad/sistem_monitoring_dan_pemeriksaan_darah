package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToNewDTOBase(model *models.ModelBase) *dto.DTOBase {
  return &dto.DTOBase{
    PublicID: model.PublicID,
  }
}
