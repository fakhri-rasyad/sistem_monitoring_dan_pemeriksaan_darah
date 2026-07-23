package dto

type Pantangan struct {
	DTOBase

	Nama string `json:"nama"`
}

type PantanganCreate struct {
	Nama string `json:"nama"`
}
