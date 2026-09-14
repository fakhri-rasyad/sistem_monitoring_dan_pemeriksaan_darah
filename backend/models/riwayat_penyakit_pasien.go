package models

type RiwayatPenyakitPasien struct {
	ModelBase

	PasienID          int `gorm:"column:pasien_id"`
	RiwayatPenyakitID int `gorm:"column:riwayat_penyakit_id"`

	RiwayatPenyakit RiwayatPenyakit `gorm:"foreignKey:RiwayatPenyakitID;references:InternalID"`
}

func (r *RiwayatPenyakitPasien) TableName() string {
	return "riwayat_penyakit_pasiens"
}
