package dto

import "time"

type Kunjungan struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`

	KomposisiTubuh *KomposisiTubuh `json:"komposisi_tubuh,omitempty"`
	DataLabs       []DataLab       `json:"data_lab,omitempty"`
	Pemeriksaan    *Pemeriksaan    `json:"pemeriksaan,omitempty"`
	Tagihan        *Tagihan        `json:"tagihan,omitempty"`
}

type KunjunganWithPatient struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`
	Pasien  *Pasien   `json:"pasien,omitempty"`
}

type KunjunganCreate struct {
	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`
}
