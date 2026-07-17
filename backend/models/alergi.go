package models

type Alergi struct {
  ModelBase

  Nama        string      `gorm:"column:nama"`

}

func (a *Alergi) TableName() string {
  return "alergis"
}
