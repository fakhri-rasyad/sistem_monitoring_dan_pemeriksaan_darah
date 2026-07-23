package dto

type Alergi struct {
	DTOBase

	Nama string `json:"nama"`
}

type AlergiCreate struct {
	Nama string `json:"nama"`
}
