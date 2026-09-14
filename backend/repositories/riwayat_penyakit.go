package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type RiwayatPenyakitRepoImpl struct {
	*RepoBaseImpl[models.RiwayatPenyakit]
}

func NewRiwayatPenyakitRepo(db *gorm.DB) RiwayatPenyakitRepoImpl {
	return RiwayatPenyakitRepoImpl{
		RepoBaseImpl: NewRepoBaseImpl[models.RiwayatPenyakit](db),
	}
}
