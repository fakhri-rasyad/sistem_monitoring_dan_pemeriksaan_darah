package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type KunjunganRepoImpl struct {
	*RepoBaseImpl[models.Kunjungan]
}

func NewKunjunganRepo(db *gorm.DB) KunjunganRepoImpl {
  return KunjunganRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.Kunjungan])(NewRepoBaseImpl[models.Kunjungan](db)),
  }
}
