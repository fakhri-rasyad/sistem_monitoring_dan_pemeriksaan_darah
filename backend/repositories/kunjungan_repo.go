package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"github.com/google/uuid"
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

func (k *KunjunganRepoImpl) GetAllWithPreload(tx *gorm.DB) ([]models.Kunjungan, error) {
	var kunjungans []models.Kunjungan
	err := k.getDB(tx).Preload("Pasien").Order("tanggal desc").Find(&kunjungans).Error

	if err != nil {
		return nil, err
	}

	return kunjungans, nil
}

func (k *KunjunganRepoImpl) GetDetailWithPreload(tx *gorm.DB, publicID uuid.UUID) (*models.Kunjungan, error) {
	kunjungan := &models.Kunjungan{}
	err := k.getDB(tx).Where("public_id = ?", publicID).Preload("KomposisiTubuh").Preload("DataLabs").Preload("DataLabs.Parameter").Preload("Pemeriksaan").First(kunjungan).Error

	if err != nil {
		return nil, err
	}

	return kunjungan, nil
}
