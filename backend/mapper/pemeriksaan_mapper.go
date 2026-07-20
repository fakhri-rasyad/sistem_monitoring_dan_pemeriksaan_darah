package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPemeriksaan(model *models.Pemeriksaan) *dto.Pemeriksaan {
  return &dto.Pemeriksaan{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Subjective: model.Subjective,
    Objective: model.Objective,
    PlanningTerapi: model.PlanningTerapi,
    Evaluasi: model.Evaluasi,
    DiperiksaAt: model.DiperiksaAt,
  }
}
