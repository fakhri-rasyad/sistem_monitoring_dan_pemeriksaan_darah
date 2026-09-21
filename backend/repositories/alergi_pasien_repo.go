package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type AlergiPasienRepoImpl struct {
	*RepoBaseImpl[models.AlergiPasiens]
}

func NewAlergiPasienRepo(db *gorm.DB) AlergiPasienRepoImpl {
	return AlergiPasienRepoImpl{
		RepoBaseImpl: NewRepoBaseImpl[models.AlergiPasiens](db),
	}
}

func (r *AlergiPasienRepoImpl) BatchDelete(tx *gorm.DB, pasienID int) error {
	if err := r.getDB(tx).Where("pasien_id = ?", pasienID).Delete(&models.AlergiPasiens{}).Error; err != nil {
		return err
	}

	return nil
}
