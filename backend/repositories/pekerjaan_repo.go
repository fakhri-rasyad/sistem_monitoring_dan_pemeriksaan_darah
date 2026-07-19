package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PekerjaanRepoImpl struct {
	*RepoBaseImpl[models.Pekerjaan]
}

func NewPekerjaanRepo(db *gorm.DB) PekerjaanRepoImpl {
  return PekerjaanRepoImpl{
    RepoBaseImpl: NewRepoBaseImpl[models.Pekerjaan](db),
  }
}
