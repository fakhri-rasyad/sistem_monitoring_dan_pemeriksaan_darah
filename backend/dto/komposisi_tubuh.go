package dto

type KomposisiTubuh struct {
	DTOBase

	Berat  float64 `json:"berat_badan"`
	Tinggi float64 `json:"tinggi_badan"`

	MassaLemak  float64 `json:"massa_lemak"`
	MassaOtot   float64 `json:"massa_otot"`
	MassaTulang float64 `json:"massa_tulang"`

	AirTubuh        float64 `json:"air_tubuh"`
	IndeksMassaTubh float64 `json:"indeks_massa_tubuh"`
}

type KomposisiTubuhCreate struct {
	Berat  float64 `json:"berat_badan"`
	Tinggi float64 `json:"tinggi_badan"`

	MassaLemak  float64 `json:"massa_lemak"`
	MassaOtot   float64 `json:"massa_otot"`
	MassaTulang float64 `json:"massa_tulang"`

	AirTubuh        float64 `json:"air_tubuh"`
	IndeksMassaTubh float64 `json:"indeks_massa_tubuh"`
}
