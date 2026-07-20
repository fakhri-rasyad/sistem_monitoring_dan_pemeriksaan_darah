package dto

type AlergiPasienBase struct {
	DTOBase

	Pasien Pasien `json:"pasien"`
	Alergi Alergi `json:"alergi"`
}
