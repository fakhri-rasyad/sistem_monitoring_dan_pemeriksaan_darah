package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type AlergiRepoImpl struct {
	*RepoBaseImpl[models.Alergi]
}

func NewAlergiRepo(db *gorm.DB) AlergiRepoImpl{
  return AlergiRepoImpl{
    RepoBaseImpl:  NewRepoBaseImpl[models.Alergi](db),
  }
}
