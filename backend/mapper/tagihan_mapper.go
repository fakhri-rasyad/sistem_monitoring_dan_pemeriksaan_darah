package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToTagihanBase(m *models.Tagihan) *dto.Tagihan {
	if m == nil {
		return nil
	}
	return &dto.Tagihan{
		BiayaKonsultasi: m.BiayaKonsultasi,
		BiayaAlat:       m.BiayaAlat,
		MetodeBayar:     m.MetodeBayar,
	}
}

func ToTagihanModel(d *dto.TagihanCreate) *models.Tagihan {
	if d == nil {
		return nil
	}

	return &models.Tagihan{
		BiayaKonsultasi: d.BiayaKonsultasi,
		BiayaAlat:       d.BiayaAlat,
		MetodeBayar:     d.MetodeBayar,
	}
}
