package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type TagihanRepo interface {
	Create(tx *gorm.DB, m *models.Tagihan) (*models.Tagihan, error)
}

type TagihanRepoImpl struct {
	db *gorm.DB
}

func NewTagihanRepo(db *gorm.DB) TagihanRepo {
	return &TagihanRepoImpl{db: db}
}

func (r *TagihanRepoImpl) getDB(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}

	return r.db
}

func (r *TagihanRepoImpl) Create(tx *gorm.DB, m *models.Tagihan) (*models.Tagihan, error) {
	if err := r.getDB(tx).Create(m).Error; err != nil {
		return nil, err
	}

	return m, nil
}
