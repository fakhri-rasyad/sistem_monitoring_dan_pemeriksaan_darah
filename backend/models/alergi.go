package models

import (
	"time"

	"github.com/google/uuid"
)

type Alergi struct {
	InternalID  int         `gorm:"column:internal_id;primaryKey;autoIncrement"`
	PublicID    uuid.UUID   `gorm:"column:public_id;default:gen_random_uuid"`

  Nama        string      `gorm:"column:nama"`

  CreatedAt   time.Time   `gorm:"column:created_at"`
  UpdatedAt   time.Time   `gorm:"column:updated_at"`
  DeletedAt   *time.Time  `gorm:"column:deleted_at"`
}

func (a *Alergi) TableName() string {
  return "alergis"
}
