package models

type Pantangan struct {
  ModelBase

  Nama        string      `gorm:"column:nama"`
}

func (p Pantangan) TableName() string {
  return "pantangans"
}
