package models

type RiwayatPenyakit struct {
	ModelBase

	Nama string `gorm:"column:nama"`
}

func (r *RiwayatPenyakit) TableName() string {
	return "riwayat_penyakits"
}
