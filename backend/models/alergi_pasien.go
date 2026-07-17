package models

type AlergiPasiens struct {
	ModelBase

	PasienID int    `gorm:"column:pasien_id"`
	Pasien   Pasien `gorm:"foreignKey:PasienID;references:InternalID"`

	AlergiID int    `gorm:"column:alergi_id"`
	Alergi   Alergi `gorm:"foreignKey:AlergiID;references:InternalID"`
}

func (d *AlergiPasiens) TableName() string {
	return "alergi_pasiens"
}
