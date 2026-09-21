package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type TagihanRepo interface {
	RepoBase[models.Tagihan]
	Create(tx *gorm.DB, m *models.Tagihan) (*models.Tagihan, error)
}

type TagihanRepoImpl struct {
	*RepoBaseImpl[models.Tagihan]
}

func NewTagihanRepo(db *gorm.DB) TagihanRepo {
	return &TagihanRepoImpl{
		RepoBaseImpl: (*RepoBaseImpl[models.Tagihan])(NewRepoBaseImpl[models.Pasien](db)),
	}
}
