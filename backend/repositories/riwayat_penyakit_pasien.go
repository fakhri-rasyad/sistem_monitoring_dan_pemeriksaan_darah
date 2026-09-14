package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type RiwayatPenyakitPasienRepoImpl struct {
	*RepoBaseImpl[models.RiwayatPenyakitPasien]
}

func NewRiwayatPenyakitPasienRepo(db *gorm.DB) RiwayatPenyakitPasienRepoImpl {
	return RiwayatPenyakitPasienRepoImpl{
		RepoBaseImpl: NewRepoBaseImpl[models.RiwayatPenyakitPasien](db),
	}
}
