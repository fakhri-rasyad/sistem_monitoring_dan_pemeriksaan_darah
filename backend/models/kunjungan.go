package models

import (
	"time"
)

type Kunjungan struct {
  ModelBase

  Tanggal     time.Time   `gorm:"column:tanggal"`
  Sistol      int         `gorm:"column:tensi_sistol"`
  Diastol     int         `gorm:"column:tensi_diastol"`

  PasienID    int         `gorm:"column:pasien_id"`

  Pasien     Pasien      `gorm:"foreignKey:PasienID;references:InternalID"`
}

func (k *Kunjungan) TableName() string {
  return "kunjungans"
}
