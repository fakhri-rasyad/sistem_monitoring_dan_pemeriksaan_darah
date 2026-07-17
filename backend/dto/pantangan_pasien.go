package dto

type PantanganPasien struct {
	DTOBase
	Pasien Pasien `json:"pasien"`

	Pantangan Pantangan `json:"pantangan"`
}
