package dto

import "time"

type Kunjungan struct {
	DTOBase

	Tanggal time.Time `json:"tanggal"`
	Sistol  int       `json:"tensi_sistol"`
	Diastol int       `json:"tensi_diastol"`

	Pasien Pasien `json:"pasien"`
}
