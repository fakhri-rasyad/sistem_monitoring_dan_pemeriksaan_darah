package dto

import "time"

type Kunjungan struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Sistol  int       `json:"tensi_sistol"`
	Diastol int       `json:"tensi_diastol"`

  KomposisiTubuh KomposisiTubuh  `json:"komposisi_tubuh"`
  DataLabs   []DataLab    `json:"data_lab"`
  Pemeriksaan Pemeriksaan `json:"pemeriksaan"`
}

type KunjunganCreate struct {
  Tanggal time.Time `json:"tanggal"`
	Sistol  int       `json:"tensi_sistol"`
	Diastol int       `json:"tensi_diastol"`
}
