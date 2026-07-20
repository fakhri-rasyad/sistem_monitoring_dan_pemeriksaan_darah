package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToKunjungan(model *models.Kunjungan) *dto.Kunjungan {
  return &dto.Kunjungan{
    DTOBase: *ToNewDTOBase(&model.ModelBase),
    Tanggal: model.Tanggal,
    Sistol: model.Sistol,
    Diastol: model.Diastol,

    Pasien: *ToPasien(&model.Pasien),
  }
}
