package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PasienRepo interface {
  RepoBase[models.Pasien]

  GetByPublicIDWithPreload(publicID uuid.UUID)(*models.Pasien, error)
  GetByNama(nama string) ([]models.Pasien, error)
}

type PasienRepoImpl struct {
	*RepoBaseImpl[models.Pasien]
}

func NewPasienRepo(db *gorm.DB) PasienRepo {
  return &PasienRepoImpl{
    RepoBaseImpl: (*RepoBaseImpl[models.Pasien])(NewRepoBaseImpl[models.Pasien](db)),
  }
}

func (r *PasienRepoImpl) GetByPublicIDWithPreload(publicID uuid.UUID)(*models.Pasien, error) {
  pasien := &models.Pasien{}

  if err := r.getDB(nil).
    Preload("Pekerjaan").
    Preload("Kunjungan.KomposisiTubuh").
    Preload("Kunjungan.DataLabs.Parameter").
    Preload("Kunjungan.Pemeriksaan").
    Preload("AlergiPasiens.Alergi").
    Preload("PantanganPasien.Pantangan").
    Where("public_id = ?", publicID).
    First(pasien).Error; err != nil {
      return nil, err
    }

  return pasien, nil
}

func (r *PasienRepoImpl) GetByNama(nama string) ([]models.Pasien, error) {
  var data []models.Pasien

  if err := r.getDB(nil).Where("nama LIKE ?", "%" + nama + "%").Find(&data).Error; err != nil {
    return nil, utils.ParseDBError(err)
  }

  return data, nil
}
