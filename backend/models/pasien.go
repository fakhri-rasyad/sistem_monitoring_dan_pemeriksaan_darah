package models

import (
	"time"
)

type Pasien struct {
  ModelBase

  Nama          string      `gorm:"column:nama"`
  Alamat        string      `gorm:"column:alamat"`
  TempatLahir   string      `gorm:"column:tempat_lahir"`
  TanggalLahir  time.Time   `gorm:"column:tanggal_lahir"`
  NomorHP       string      `gorm:"column:nomor_hp"`
  Email         string      `gorm:"column:email"`

  PekerjaanID   int         `gorm:"column:pekerjaan_id"`

  Pekerjaan     Pekerjaan   `gorm:"foreignKey:PekerjaanID;references:InternalID"`

}

func (p *Pasien) TableName() string {
  return "pasiens"
}
