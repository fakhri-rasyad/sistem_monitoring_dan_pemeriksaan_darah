package dto

import "time"

type Kunjungan struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`

	KomposisiTubuh KomposisiTubuh `json:"komposisi_tubuh"`
	DataLabs       []DataLab      `json:"data_lab"`
	Pemeriksaan    Pemeriksaan    `json:"pemeriksaan"`
}

type KunjunganWithPatient struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`
	Pasien  Pasien    `json:"pasien,omitempty"`
}

type KunjunganCreate struct {
	Tanggal time.Time `json:"tanggal"`
	Tensi   string    `json:"tensi"`
}
