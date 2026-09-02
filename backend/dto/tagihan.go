package dto

import "fakhri-rasyad/sistem_monitoring_darah/utils"

type Tagihan struct {
	DTOBase

	BiayaKonsultasi int                    `json:"biaya_konsultasi"`
	BiayaAlat       int                    `json:"biaya_alat"`
	MetodeBayar     utils.MetodePembayaran `json:"metode_pembayaran"`
}

type TagihanCreate struct {
	BiayaKonsultasi int                    `json:"biaya_konsultasi"`
	BiayaAlat       int                    `json:"biaya_alat"`
	MetodeBayar     utils.MetodePembayaran `json:"metode_pembayaran"`
}
