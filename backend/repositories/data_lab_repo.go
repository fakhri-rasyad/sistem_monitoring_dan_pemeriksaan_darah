package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type DataLabRepoImpl struct {
	*RepoBaseImpl[models.DataLab]
}

func NewDataLabRepo(db *gorm.DB) DataLabRepoImpl {
  return DataLabRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.DataLab])(NewRepoBaseImpl[models.DataLab](db)),
  }
}
