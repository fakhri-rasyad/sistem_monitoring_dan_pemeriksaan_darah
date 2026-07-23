package dto

import "github.com/google/uuid"

type AlergiPasienBase struct {
	DTOBase

	Alergi Alergi `json:"alergi"`
}

type AlergiPasienCreate struct {
  PublicID       uuid.UUID  `json:"public_id"`
	AlergiPublicID uuid.UUID `json:"alergi_public_id"`
}
