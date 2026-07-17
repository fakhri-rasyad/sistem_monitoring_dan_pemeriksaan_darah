package dto

import "time"

type Pasien struct {
	DTOBase

	Nama         string    `json:"nama"`
	Alamat       string    `json:"alamat"`
	TempatLahir  string    `json:"tempat_lahir"`
	TanggalLahir time.Time `json:"tanggal_lahir"`
	NomorHP      string    `json:"nomor_hp"`
	Email        string    `json:"email"`

	Pekerjaan Pekerjaan `json:"pekerjaan"`
}
