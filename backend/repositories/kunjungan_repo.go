package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

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
