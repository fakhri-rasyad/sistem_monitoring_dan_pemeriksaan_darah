package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPasien(model *models.Pasien) *dto.Pasien {
  return &dto.Pasien{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Nama: model.Nama,
    Alamat: model.Alamat,
    TempatLahir: model.TempatLahir,
    TanggalLahir: model.TanggalLahir,
    NomorHP: model.NomorHP,
    Email: model.Email,

    Pekerjaan: *Map(&model.Pekerjaan, ToPekerjaan),
  }
}
