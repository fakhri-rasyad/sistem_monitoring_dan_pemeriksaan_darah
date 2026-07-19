package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PantanganPasienRepoImpl struct {
	*RepoBaseImpl[models.PantanganPasien]
}

func NewPantanganPasienRepo(db *gorm.DB) PantanganPasienRepoImpl {
  return PantanganPasienRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.PantanganPasien])(NewRepoBaseImpl[models.PantanganPasien](db)),
  }
}
