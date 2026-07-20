package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToKunjungan(model *models.Kunjungan) *dto.Kunjungan {
  dto := &dto.Kunjungan{
    Tanggal: model.Tanggal,
    Sistol: model.Sistol,
    Diastol: model.Diastol,
  }

  if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
    dto.DTOBase = *dtoBase
  }


  if komposisiTubuh := Map(&model.KomposisiTubuh, ToKomposisiTubuh); komposisiTubuh != nil {
    dto.KomposisiTubuh = *komposisiTubuh
  }

  if dataLabs := MapSlice(model.DataLabs, ToDataLabBase); dataLabs != nil {
    dto.DataLabs = dataLabs
  }

  if pemeriksaan := Map(model.Pemeriksaan, ToPemeriksaan); pemeriksaan != nil {
    dto.Pemeriksaan = *pemeriksaan
  }

  return dto
}
