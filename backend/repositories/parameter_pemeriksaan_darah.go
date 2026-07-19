package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type ParameterPemeriksaanDarahImpl struct {
	*RepoBaseImpl[models.ParameterPemeriksaanDarah]
}

func NewParameterPemeriksaanDarah(db *gorm.DB) ParameterPemeriksaanDarahImpl {
  return ParameterPemeriksaanDarahImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.ParameterPemeriksaanDarah])(NewRepoBaseImpl[models.ParameterPemeriksaanDarah](db)),
  }
}
