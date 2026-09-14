package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToRiwayatPenyakitBase(model *models.RiwayatPenyakit) *dto.RiwayatPenyakit {
	dto := &dto.RiwayatPenyakit{
		Nama: model.Nama,
	}

	if dtoBase := Map(&model.ModelBase, ToNewDTOBase); dtoBase != nil {
		dto.DTOBase = *dtoBase
	}

	return dto

}
