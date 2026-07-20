package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToKomposisiTubuh(model *models.KomposisiTubuh) *dto.KomposisiTubuh {
  return &dto.KomposisiTubuh{
    DTOBase: *ToNewDTOBase(&model.ModelBase),
    Berat: model.Berat,
    Tinggi: model.Tinggi,

    MassaLemak: model.MassaLemak,
    MassaOtot: model.MassaOtot,
    MassaTulang: model.MassaTulang,

    AirTubuh: model.AirTubuh,
    IndeksMassaTubh: model.IndeksMassaTubh,

    Kunjungan: *ToKunjungan(&model.Kunjungan),
  }
}
