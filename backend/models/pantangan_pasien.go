package models

type PantanganPasien struct {
	ModelBase

	PasienID int    `gorm:"column:pasien_id"`
	Pasien   Pasien `gorm:"foreignKey:PasienID;references:InternalID"`

	PantanganID int       `gorm:"column:pantangan_id"`
	Pantangan   Pantangan `gorm:"foreignKey:PantanganID;references:InternalID"`
}

func (d *PantanganPasien) TableName() string {
	return "pantangan_pasiens"
}
