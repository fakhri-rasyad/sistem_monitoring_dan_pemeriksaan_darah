package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToDataLabBase(model *models.DataLab) *dto.DataLab {
  return &dto.DataLab{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Nilai: model.Nilai,
    Kunjungan: *Map(&model.Kunjungan, ToKunjungan),
    Parameter: *Map(&model.Parameter, ToPPDarah),
  }
}
