package dto

import "github.com/google/uuid"

type AlergiPasienBase struct {
	DTOBase

	Alergi Alergi `json:"alergi"`
}

type AlergiPasienCreate struct {
	AlergiPublicID uuid.UUID `json:"alergi_public_id"`
}
