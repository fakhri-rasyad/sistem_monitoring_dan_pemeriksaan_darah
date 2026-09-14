package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToRiwayatPenyakitPasien(model *models.RiwayatPenyakitPasien) *dto.RiwayatPenyakitPasien {
	dto := &dto.RiwayatPenyakitPasien{
		RiwayatPenyakit: *Map(&model.RiwayatPenyakit, ToRiwayatPenyakitBase),
	}

	if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
		dto.DTOBase = *dtoBase
	}

	if riwayatPenyakit := Map(&model.RiwayatPenyakit, ToRiwayatPenyakitBase); riwayatPenyakit != nil {
		dto.RiwayatPenyakit = *riwayatPenyakit
	}

	return dto
}
