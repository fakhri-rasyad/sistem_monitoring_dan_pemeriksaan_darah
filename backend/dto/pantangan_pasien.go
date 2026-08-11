package dto

import "github.com/google/uuid"

type PantanganPasien struct {
	DTOBase

	Pantangan Pantangan `json:"pantangan"`
}

type PantanganPasienCreate struct {
	PantanganPublicID uuid.UUID `json:"pantangan_public_id"`
}
