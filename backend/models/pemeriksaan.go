package models

import "time"

type Pemeriksaan struct {
	ModelBase

	Subjective     string `gorm:"column:subjective"`
	Objective      string `gorm:"column:objective"`
	PlanningTerapi string `gorm:"column:planning_terapi"`
	Evaluasi       string `gorm:"column:evaluasi"`
	DiperiksaAt    time.Time  `gorm:"column:diperiksa_at"`

	KunjunganID int       `gorm:"column:kunjungan_id"`
	Kunjungan   Kunjungan `gorm:"foreignKey:KunjunganID;references:InternalID"`
}

func (p *Pemeriksaan) TableName() string {
	return "pemeriksaans"
}
