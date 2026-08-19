package models

import (
	"time"
)

type Kunjungan struct {
	ModelBase

	Tanggal time.Time `gorm:"column:tanggal"`
	Tensi   string    `gorm:"column:tensi"`

	PasienID int    `gorm:"column:pasien_id"`
	Pasien   Pasien `gorm:"foreignKey:PasienID;references:InternalID"`

	KomposisiTubuh KomposisiTubuh `gorm:"foreignKey:KunjunganID"`
	DataLabs       []DataLab      `gorm:"foreignKey:KunjunganID"`
	Pemeriksaan    *Pemeriksaan   `gorm:"foreignKey:KunjunganID"`
}

func (k *Kunjungan) TableName() string {
	return "kunjungans"
}
