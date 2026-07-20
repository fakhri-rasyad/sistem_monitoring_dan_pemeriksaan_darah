package dto

import "time"

type Pemeriksaan struct {
	DTOBase

	Subjective     string `json:"subjective"`
	Objective      string `json:"objective"`
	PlanningTerapi string `json:"planning_terapi"`
	Evaluasi       string `json:"evaluasi"`
	DiperiksaAt    time.Time  `json:"diperiksa_at"`
}

