package models

type Pekerjaan struct {
  ModelBase
  Nama        string      `gorm:"column:nama"`

}


func (p *Pekerjaan) TableName() string {
  return "pekerjaans"
}
