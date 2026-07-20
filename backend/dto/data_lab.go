package dto

type DataLab struct {
	DTOBase

	Nilai     float64                   `json:"nilai"`
	Parameter ParameterPemeriksaanDarah `json:"parameter"`
}
