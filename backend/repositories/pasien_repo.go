package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PasienRepoImpl struct {
	*RepoBaseImpl[models.Pasien]
}

func NewPasienRepo(db *gorm.DB) PasienRepoImpl {
  return PasienRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.Pasien])(NewRepoBaseImpl[models.Pasien](db)),
  }
}
