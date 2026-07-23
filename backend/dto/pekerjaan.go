package dto

type Pekerjaan struct {
	DTOBase
	Nama string `json:"nama"`
}

type PekerjaanCreate struct {
	Nama string `json:"nama"`
}
