package dto

import "github.com/google/uuid"

type PantanganPasien struct {
	DTOBase

	Pantangan Pantangan `json:"pantangan"`
}

type PantanganPasienCreate struct {
  PublicID       uuid.UUID  `json:"public_id"`
	PantanganPublicID uuid.UUID `json:"pantangan_public_id"`
}
