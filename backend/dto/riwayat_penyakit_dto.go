package dto

type RiwayatPenyakit struct {
	DTOBase

	Nama string `json:"nama"`
}

type RiwayatPenyakitCreate struct {
	Nama string `json:"nama"`
}
