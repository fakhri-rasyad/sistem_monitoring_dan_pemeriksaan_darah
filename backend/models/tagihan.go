package models

import "fakhri-rasyad/sistem_monitoring_darah/utils"

type Tagihan struct {
	ModelBase

	BiayaKonsultasi int                    `gorm:"column:biaya_konsultasi"`
	BiayaAlat       int                    `gorm:"column:biaya_alat"`
	MetodeBayar     utils.MetodePembayaran `gorm:"column:metode_bayar"`

	KunjunganID int `gorm:"column:kunjungan_id"`
}
