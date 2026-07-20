package dto

type PantanganPasien struct {
	DTOBase

	Pantangan Pantangan `json:"pantangan"`
}
