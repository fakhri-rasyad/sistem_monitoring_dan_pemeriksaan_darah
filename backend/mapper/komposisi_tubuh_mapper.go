package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToKomposisiTubuh(model *models.KomposisiTubuh) *dto.KomposisiTubuh {
  dto :=  &dto.KomposisiTubuh{
    Berat: model.Berat,
    Tinggi: model.Tinggi,

    MassaLemak: model.MassaLemak,
    MassaOtot: model.MassaOtot,
    MassaTulang: model.MassaTulang,

    AirTubuh: model.AirTubuh,
    IndeksMassaTubh: model.IndeksMassaTubh,
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }

  return dto
}
