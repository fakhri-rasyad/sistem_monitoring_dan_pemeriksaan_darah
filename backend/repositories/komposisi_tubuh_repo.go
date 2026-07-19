package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type KomposisiTubuhRepoImpl struct {
	*RepoBaseImpl[models.KomposisiTubuh]
}

func NewKomposisiTubuhRepo(db *gorm.DB) KomposisiTubuhRepoImpl {
  return KomposisiTubuhRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.KomposisiTubuh])(NewRepoBaseImpl[models.KomposisiTubuh](db)),
  }
}
