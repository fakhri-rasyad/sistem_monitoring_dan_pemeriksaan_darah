package repositories

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PasienRepo interface {
	RepoBase[models.Pasien]

	Create(tx *gorm.DB, m *models.Pasien) (*models.Pasien, error)
	GetByPublicIDWithPreload(publicID uuid.UUID) (*models.Pasien, error)
	GetByNama(nama string) ([]models.Pasien, error)
	GetAllWithPreload() ([]models.Pasien, error)
	ExportUserData(publicID uuid.UUID) (*models.Pasien, error)
}

type PasienRepoImpl struct {
	*RepoBaseImpl[models.Pasien]
}

func NewPasienRepo(db *gorm.DB) PasienRepo {
	return &PasienRepoImpl{
		RepoBaseImpl: (*RepoBaseImpl[models.Pasien])(NewRepoBaseImpl[models.Pasien](db)),
	}
}

func (r *PasienRepoImpl) GetByPublicIDWithPreload(publicID uuid.UUID) (*models.Pasien, error) {
	pasien := &models.Pasien{}

	if err := r.getDB(nil).
		Preload("Pekerjaan").
		Preload("Kunjungan").
		Preload("AlergiPasiens.Alergi").
		Preload("PantanganPasien.Pantangan").
		Preload("RiwayatPenyakitPasien.RiwayatPenyakit").
		Where("public_id = ?", publicID).
		First(pasien).Error; err != nil {
		return nil, err
	}

	return pasien, nil
}

func (r *PasienRepoImpl) ExportUserData(publicID uuid.UUID) (*models.Pasien, error) {
	pasien := &models.Pasien{}

	if err := r.getDB(nil).
		Preload("Pekerjaan").
		Preload("Kunjungan").
		Preload("AlergiPasiens.Alergi").
		Preload("PantanganPasien.Pantangan").
		Preload("Kunjungan.KomposisiTubuh").
		Preload("Kunjungan.DataLabs").
		Preload("Kunjungan.DataLabs.Parameter").
		Preload("Kunjungan.Pemeriksaan").
		Preload("Kunjungan.Tagihan").
		Where("public_id = ?", publicID).
		First(pasien).Error; err != nil {
		return nil, err
	}

	return pasien, nil
}

func (r *PasienRepoImpl) Create(tx *gorm.DB, m *models.Pasien) (*models.Pasien, error) {

	if err := r.getDB(tx).Create(m).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return nil, errors.New("Email sudah dipakai")
		}
		return nil, utils.ParseGormError(err)
	}

	return m, nil
}

func (r *PasienRepoImpl) GetByNama(nama string) ([]models.Pasien, error) {
	var data []models.Pasien

	if err := r.getDB(nil).Where("nama LIKE ?", "%"+nama+"%").Find(&data).Error; err != nil {
		return nil, utils.ParseDBError(err)
	}

	return data, nil
}
func (r *PasienRepoImpl) GetAllWithPreload() ([]models.Pasien, error) {
	var listData []models.Pasien

	if err := r.getDB(nil).Preload("Pekerjaan").Find(&listData).Error; err != nil {
		return nil, err
	}

	return listData, nil
}
