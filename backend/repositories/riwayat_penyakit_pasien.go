package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"

	"gorm.io/gorm"
)

type RiwayatPenyakitPasienRepoImpl struct {
	*RepoBaseImpl[models.RiwayatPenyakitPasien]
}

func NewRiwayatPenyakitPasienRepo(db *gorm.DB) RiwayatPenyakitPasienRepoImpl {
	return RiwayatPenyakitPasienRepoImpl{
		RepoBaseImpl: NewRepoBaseImpl[models.RiwayatPenyakitPasien](db),
	}
}

func (r *RiwayatPenyakitPasienRepoImpl) BatchDelete(tx *gorm.DB, pasienID int) error {
	if err := r.getDB(tx).Where("pasien_id = ?", pasienID).Delete(&models.RiwayatPenyakitPasien{}).Error; err != nil {
		return err
	}

	return nil
}
