package dto

type DataLab struct {
	DTOBase

	Nilai     float64                   `json:"nilai"`
	Kunjungan Kunjungan                 `json:"kunjungan"`
	Parameter ParameterPemeriksaanDarah `json:"parameter"`
}
