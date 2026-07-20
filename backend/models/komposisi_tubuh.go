package models

type KomposisiTubuh struct {
	ModelBase

	Berat  float64 `gorm:"column:berat_badan"`
	Tinggi float64 `gorm:"column:tinggi_badan"`

	MassaLemak  float64 `gorm:"column:massa_lemak"`
	MassaOtot   float64 `gorm:"column:massa_otot"`
	MassaTulang float64 `gorm:"column:massa_tulang"`

	AirTubuh        float64 `gorm:"column:air_tubuh"`
	IndeksMassaTubh float64 `gorm:"column:indeks_massa_tubuh"`

	KunjunganID int `gorm:"column:kunjungan_id"`
}

func (d *KomposisiTubuh) TableName() string {
	return "komposisi_tubuhs"
}
