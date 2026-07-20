package dto

import "github.com/google/uuid"

type DataLab struct {
	DTOBase

	Nilai     float64                   `json:"nilai"`
	Parameter ParameterPemeriksaanDarah `json:"parameter"`
}

type DataLabCreate struct {
	Nilai     float64   `json:"nilai"`
	ParameterPublicID uuid.UUID `json:"parameter_public_id"`
}
