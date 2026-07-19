package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PemeriksaanRepoImpl struct {
	*RepoBaseImpl[models.Pemeriksaan]
}

func NewPemeriksaanRepo(db *gorm.DB) PemeriksaanRepoImpl {
  return PemeriksaanRepoImpl{
    RepoBaseImpl: NewRepoBaseImpl[models.Pemeriksaan](db),
  }
}
