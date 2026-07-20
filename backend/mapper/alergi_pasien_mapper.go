package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToAlergiPasienBase(model *models.AlergiPasiens) *dto.AlergiPasienBase {
	return &dto.AlergiPasienBase{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Pasien: *Map(&model.Pasien, ToPasien),
    Alergi: *Map(&model.Alergi, ToAlergiBase),
  }
}
