package dto

import (
	"time"

	"github.com/google/uuid"
)

type Pasien struct {
	DTOBase

	Nama         string    `json:"nama"`
	Alamat       string    `json:"alamat"`
	TempatLahir  string    `json:"tempat_lahir"`
	TanggalLahir time.Time `json:"tanggal_lahir"`
	NomorHP      string    `json:"nomor_hp"`
	Email        string    `json:"email"`

	Pekerjaan              Pekerjaan               `json:"pekerjaan"`
	AlergiPasiens          []AlergiPasienBase      `json:"alergi_pasien"`
	PantanganPasiens       []PantanganPasien       `json:"pantangan_pasien"`
	RiwayatPenyakitPasiens []RiwayatPenyakitPasien `json:"riwayat_penyakit_pasien"`
	Kunjungans             []Kunjungan             `json:"kunjungan"`
}

type PasienCreate struct {
	Nama              string    `json:"nama"`
	Alamat            string    `json:"alamat"`
	TempatLahir       string    `json:"tempat_lahir"`
	TanggalLahir      time.Time `json:"tanggal_lahir"`
	NomorHP           string    `json:"nomor_hp"`
	Email             string    `json:"email"`
	PekerjaanPublicID uuid.UUID `json:"pekerjaan_public_id"`
}

type PasienUpdate struct {
	Pasien                 PasienReference               `json:"pasien"`
	AlergiPasiens          []AlergiPasienCreate          `json:"alergi_pasiens"`
	PantanganPasiens       []PantanganPasienCreate       `json:"pantangan_pasiens"`
	RiwayatPenyakitPasiens []RiwayatPenyakitPasienCreate `json:"riwayat_penyakit_pasiens"`
}

type PasienReference struct {
	PublicID *uuid.UUID    `json:"pasien_public_id"`
	Create   *PasienCreate `json:"pasien_create"`
}
