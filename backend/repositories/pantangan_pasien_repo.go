package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type PantanganPasienRepoImpl struct {
	*RepoBaseImpl[models.PantanganPasien]
}

func NewPantanganPasienRepo(db *gorm.DB) PantanganPasienRepoImpl {
	return PantanganPasienRepoImpl{
		RepoBaseImpl: (*RepoBaseImpl[models.PantanganPasien])(NewRepoBaseImpl[models.PantanganPasien](db)),
	}
}

func (r *PantanganPasienRepoImpl) BatchDelete(tx *gorm.DB, pasienID int) error {
	if err := r.getDB(tx).Where("pasien_id = ?", pasienID).Delete(&models.PantanganPasien{}).Error; err != nil {
		return err
	}

	return nil
}
