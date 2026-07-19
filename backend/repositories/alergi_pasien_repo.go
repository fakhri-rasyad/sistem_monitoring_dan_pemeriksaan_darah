package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type AlergiPasienRepoImpl struct {
  *RepoBaseImpl[models.AlergiPasiens]
}

func NewAlergiPasienRepo(db *gorm.DB) AlergiPasienRepoImpl {
  return AlergiPasienRepoImpl{
    RepoBaseImpl: NewRepoBaseImpl[models.AlergiPasiens](db),
  }
}


