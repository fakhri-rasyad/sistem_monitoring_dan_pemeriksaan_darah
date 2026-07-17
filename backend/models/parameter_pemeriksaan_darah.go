package models

type ParameterPemeriksaanDarah struct {
	ModelBase

	Nama   string `gorm:"column:nama"`
	Satuan string `gorm:"column:satuan"`
}

func (k *ParameterPemeriksaanDarah) TableName() string {
	return "parameter_pemeriksaan_darahs"
}
