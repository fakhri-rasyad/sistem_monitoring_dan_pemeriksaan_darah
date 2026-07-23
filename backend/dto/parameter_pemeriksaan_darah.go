package dto

type ParameterPemeriksaanDarah struct {
	DTOBase

	Nama   string `json:"nama"`
	Satuan string `json:"satuan"`
}

type ParameterPemeriksaanDarahCreate struct {
	Nama   string `json:"nama"`
	Satuan string `json:"satuan"`
}
