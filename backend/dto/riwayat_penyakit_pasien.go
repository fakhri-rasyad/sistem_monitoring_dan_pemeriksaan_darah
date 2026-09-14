package dto

import "github.com/google/uuid"

type RiwayatPenyakitPasien struct {
	DTOBase

	RiwayatPenyakit RiwayatPenyakit `json:"riwayat_penyakit"`
}

type RiwayatPenyakitPasienCreate struct {
	RiwayatPenyakitPublicID uuid.UUID `json:"riwayat_penyakit_public_id"`
}
