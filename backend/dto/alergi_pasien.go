package dto

type AlergiBase struct {
	DTOBase

	Pasien Pasien `json:"pasien"`
	Alergi Alergi `json:"alergi"`
}
