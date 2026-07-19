package repositories

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RepoBase[T any] interface {
  GetDB(tx *gorm.DB) *gorm.DB
	Create(tx *gorm.DB, entity *T) (*T, error)
  GetByPublicID(tx *gorm.DB, uuid uuid.UUID) (*T, error)
  GetAll(tx *gorm.DB) ([]T, error)
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

func (r *RepoBaseImpl[T]) Create(tx *gorm.DB, entity *T) error {
    return r.getDB(tx).Create(entity).Error
}

func (r *RepoBaseImpl[T]) GetByPublicID(tx *gorm.DB, uuid uuid.UUID) (*T, error) {
    var entity T

    err := r.getDB(tx).
        Where("public_id = ?", uuid).
        First(&entity).
        Error

    if err != nil {
        return nil, err
    }

    return &entity, nil
}

func (r *RepoBaseImpl[T]) GetAll(tx *gorm.DB) ([]T, error) {
    var entities []T

    err := r.getDB(tx).
        Find(&entities).
        Error

    return entities, err
}
