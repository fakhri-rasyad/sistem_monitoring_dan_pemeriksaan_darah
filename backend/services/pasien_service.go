package services

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/mapper"
	"fakhri-rasyad/sistem_monitoring_darah/models"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PasienService interface {
	Create(create *dto.PasienCreate) error
	GetByPublicID(publicID uuid.UUID) (*dto.Pasien, error)
	GetByPublicIDWithPreload(publicID uuid.UUID) (*dto.Pasien, error)
	GetAll() ([]dto.Pasien, error)
	Update(update *dto.PasienUpdate) error
	GetAllWithPreload() ([]dto.Pasien, error)
	Delete(publicID uuid.UUID) error
}

type PasienServiceImpl struct {
	r    repositories.PasienRepo
	pr   repositories.RepoBase[models.Pekerjaan]
	ar   repositories.AlergiRepoImpl
	apr  repositories.AlergiPasienRepoImpl
	ptr  repositories.PantanganRepoImpl
	ptpr repositories.PantanganPasienRepoImpl
	rpr  repositories.RiwayatPenyakitRepoImpl
	rppr repositories.RiwayatPenyakitPasienRepoImpl
}

func (a *PasienServiceImpl) Create(create *dto.PasienCreate) error {
	pekerjaan, err := a.pr.GetByPublicID(nil, create.PekerjaanPublicID)

	if err != nil {
		return err
	}

	gorm := &models.Pasien{
		Nama:         create.Nama,
		Alamat:       create.Alamat,
		TempatLahir:  create.TempatLahir,
		TanggalLahir: create.TanggalLahir,
		NomorHP:      create.NomorHP,
		Email:        create.Email,
		PekerjaanID:  pekerjaan.InternalID,
	}

	_, err = a.r.Create(nil, gorm)

	if err != nil {
		return err
	} else {
		return nil
	}
}

func (a *PasienServiceImpl) GetAll() ([]dto.Pasien, error) {
	data, err := a.r.GetAll(nil)
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) GetByPublicID(publicID uuid.UUID) (*dto.Pasien, error) {
	data, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) GetByPublicIDWithPreload(publicID uuid.UUID) (*dto.Pasien, error) {
	data, err := a.r.GetByPublicIDWithPreload(publicID)
	if err != nil {
		return nil, err
	}

	return mapper.Map(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) GetAllWithPreload() ([]dto.Pasien, error) {
	data, err := a.r.GetAllWithPreload()
	if err != nil {
		return nil, err
	}

	return mapper.MapSlice(data, mapper.ToPasien), nil
}

func (a *PasienServiceImpl) Delete(publicID uuid.UUID) error {
	pasien, err := a.r.GetByPublicID(nil, publicID)
	if err != nil {
		return err
	}

	if err = a.r.Delete(nil, pasien.InternalID); err != nil {
		return err
	}

	return nil
}

func (a *PasienServiceImpl) Update(update *dto.PasienUpdate) error {
	wf := beginWorkflow()

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("PANIC: %v\n", r)
			wf.Rollback()
		}
	}()

	pasienId, err := a.resolvePasien(wf.tx, &update.Pasien)

	if err != nil {
		return err
	}

	if err = a.resolveAlergiPasien(wf.tx, *pasienId, update.AlergiPasiens); err != nil {
		return err
	}

	if err = a.resolvePantanganPasien(wf.tx, *pasienId, update.PantanganPasiens); err != nil {
		return err
	}

	if err = a.resolveRiwayatPenyakitPasien(wf.tx, *pasienId, update.RiwayatPenyakitPasiens); err != nil {
		return err
	}

	wf.Commit()

	return nil
}

func (s *PasienServiceImpl) resolvePasien(tx *gorm.DB, update *dto.PasienReference) (*int, error) {
	pasien, err := s.r.GetByPublicID(tx, *update.PublicID)

	if err != nil {
		return nil, err
	}

	pasien.Nama = update.Create.Nama
	pasien.Alamat = update.Create.Alamat
	pasien.TempatLahir = update.Create.TempatLahir
	pasien.TanggalLahir = update.Create.TanggalLahir
	pasien.NomorHP = update.Create.NomorHP
	pasien.Email = update.Create.Email

	pekerjaan, err := s.pr.GetByPublicID(tx, update.Create.PekerjaanPublicID)
	if err != nil {
		return nil, err
	}

	pasien.PekerjaanID = pekerjaan.InternalID

	if err := s.r.Update(tx, pasien); err != nil {
		return nil, err
	}

	return &pasien.InternalID, nil
}

func (s *PasienServiceImpl) resolveAlergiPasien(tx *gorm.DB, pasienID int, ref []dto.AlergiPasienCreate) error {
	if err := s.apr.BatchDelete(tx, pasienID); err != nil {
		return err
	}

	for _, item := range ref {
		alergi, err := s.ar.GetByPublicID(tx, item.AlergiPublicID)
		if err != nil {
			return err
		}

		alergiPasien := &models.AlergiPasiens{
			PasienID: pasienID,
			AlergiID: alergi.InternalID,
		}

		if _, err := s.apr.Create(tx, alergiPasien); err != nil {
			return err
		}
	}

	return nil
}

func (s *PasienServiceImpl) resolvePantanganPasien(tx *gorm.DB, pasienID int, ref []dto.PantanganPasienCreate) error {
	if err := s.ptpr.BatchDelete(tx, pasienID); err != nil {
		return err
	}

	for _, item := range ref {
		pantangan, err := s.ptr.GetByPublicID(tx, item.PantanganPublicID)
		if err != nil {
			return err
		}

		pantanganPasien := &models.PantanganPasien{
			PasienID:    pasienID,
			PantanganID: pantangan.InternalID,
		}

		if _, err := s.ptpr.Create(tx, pantanganPasien); err != nil {
			return err
		}
	}

	return nil
}

func (s *PasienServiceImpl) resolveRiwayatPenyakitPasien(tx *gorm.DB, pasienID int, ref []dto.RiwayatPenyakitPasienCreate) error {
	if err := s.rppr.BatchDelete(tx, pasienID); err != nil {
		return err
	}

	for _, item := range ref {
		riwayatPenyakit, err := s.rpr.GetByPublicID(tx, item.RiwayatPenyakitPublicID)

		if err != nil {
			return err
		}

		model := &models.RiwayatPenyakitPasien{
			PasienID:          pasienID,
			RiwayatPenyakitID: riwayatPenyakit.InternalID,
		}

		_, err = s.rppr.Create(tx, model)

		if err != nil {
			return err
		}
	}

	return nil
}

func NewPasienService(
	r repositories.PasienRepo,
	pr repositories.RepoBase[models.Pekerjaan],
	ar repositories.AlergiRepoImpl,
	apr repositories.AlergiPasienRepoImpl,
	ptr repositories.PantanganRepoImpl,
	ptpr repositories.PantanganPasienRepoImpl,
	rpr repositories.RiwayatPenyakitRepoImpl,
	rppr repositories.RiwayatPenyakitPasienRepoImpl,

) PasienService {
	return &PasienServiceImpl{
		r:    r,
		pr:   pr,
		ar:   ar,
		apr:  apr,
		ptr:  ptr,
		ptpr: ptpr,
		rpr:  rpr,
		rppr: rppr,
	}
}
