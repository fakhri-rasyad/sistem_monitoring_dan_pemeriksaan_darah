package dto

import "github.com/google/uuid"

type DTOBase struct {
	PublicID uuid.UUID   `json:"public_id"`
}
