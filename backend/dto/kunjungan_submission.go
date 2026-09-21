package dto

import "github.com/google/uuid"

type KunjunganSubmission struct {
	PasienPublicID string               `json:"pasien_public_id"`
	Kunjungan      KunjunganCreate      `json:"kunjungan"`
	KomposisiTubuh KomposisiTubuhCreate `json:"komposisi_tubuh"`
	DataLabs       []DataLabCreate      `json:"data_labs"`
	Pemeriksaan    PemeriksaanCreate    `json:"pemeriksaan"`
	Tagihan        TagihanCreate        `json:"tagihan"`
}

type KunjunganUpdate struct {
	KunjunganPubID uuid.UUID            `json:"kunjungan_public_id"`
	Kunjungan      KunjunganCreate      `json:"kunjungan"`
	KomposisiTubuh KomposisiTubuhCreate `json:"komposisi_tubuh"`
	DataLabs       []DataLabCreate      `json:"data_labs"`
	Pemeriksaan    PemeriksaanCreate    `json:"pemeriksaan"`
	Tagihan        TagihanCreate        `json:"tagihan"`
}
