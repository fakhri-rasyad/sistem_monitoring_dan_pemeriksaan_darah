package models

type DataLab struct {
	ModelBase

	Nilai float64 `gorm:"column:nilai"`

	KunjunganID int `gorm:"column:kunjungan_id"`
	ParameterID int `gorm:"column:parameter_id"`

	// Kunjungan Kunjungan                 `gorm:"foreignKey:KunjunganID;references:InternalID"`
	Parameter ParameterPemeriksaanDarah `gorm:"foreignKey:ParameterID"`
}

func (d *DataLab) TableName() string {
	return "data_labs"
}
