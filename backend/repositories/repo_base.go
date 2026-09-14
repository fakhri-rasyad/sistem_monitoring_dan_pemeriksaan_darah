package repositories

import (
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RepoBase[T any] interface {
	Create(tx *gorm.DB, entity *T) (*T, error)
	GetByPublicID(tx *gorm.DB, uuid uuid.UUID) (*T, error)
	Update(tx *gorm.DB, toUpdate *T) error
	GetAll(tx *gorm.DB) ([]T, error)
	Delete(tx *gorm.DB, id int) error
}

type RepoBaseImpl[T any] struct {
	db *gorm.DB
}

func NewRepoBaseImpl[T any](db *gorm.DB) *RepoBaseImpl[T] {
	return &RepoBaseImpl[T]{db: db}
}

func (r *RepoBaseImpl[T]) getDB(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}

	return r.db
}

func (r *RepoBaseImpl[T]) Create(tx *gorm.DB, entity *T) (*T, error) {

	if err := r.getDB(tx).Create(entity).Error; err != nil {
		return nil, utils.ParseGormError(err)
	}

	return entity, nil
}

func (r *RepoBaseImpl[T]) GetByPublicID(tx *gorm.DB, uuid uuid.UUID) (*T, error) {
	var entity T

	err := r.getDB(tx).
		Where("public_id = ?", uuid).
		First(&entity).
		Error

	if err != nil {
		return nil, utils.ParseGormError(err)
	}

	return &entity, nil
}

func (r *RepoBaseImpl[T]) GetAll(tx *gorm.DB) ([]T, error) {
	var entities []T

	err := r.getDB(tx).
		Find(&entities).
		Error

	if err != nil {
		return nil, utils.ParseGormError(err)
	}

	return entities, nil
}

func (r *RepoBaseImpl[T]) Update(tx *gorm.DB, toUpdate *T) error {
	if err := r.getDB(tx).Save(toUpdate).Error; err != nil {
		return err
	}
	return nil
}

func (r *RepoBaseImpl[T]) Delete(tx *gorm.DB, id int) error {
	var entity T

	if err := r.getDB(tx).Where("internal_id = ?", id).Delete(&entity).Error; err != nil {
		return err
	}

	return nil
}
