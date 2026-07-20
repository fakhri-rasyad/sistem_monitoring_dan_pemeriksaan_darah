package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPPDarah(model *models.ParameterPemeriksaanDarah) *dto.ParameterPemeriksaanDarah {
  return &dto.ParameterPemeriksaanDarah{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Nama: model.Nama,
    Satuan: model.Satuan,
  }
}
