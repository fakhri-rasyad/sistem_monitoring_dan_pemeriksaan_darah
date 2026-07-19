package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PantanganRepoImpl struct {
	*RepoBaseImpl[models.Pantangan]
}

func NewPantanganRepo(db *gorm.DB) PantanganRepoImpl {
  return PantanganRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.Pantangan])(NewRepoBaseImpl[models.Pantangan](db)),
  }
}
