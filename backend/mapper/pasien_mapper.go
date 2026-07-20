package mapper

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/models"
)

func ToPasien(model *models.Pasien) *dto.Pasien {
  dto := &dto.Pasien{
    DTOBase: *Map(&model.ModelBase, ToNewDTOBase),
    Nama: model.Nama,
    Alamat: model.Alamat,
    TempatLahir: model.TempatLahir,
    TanggalLahir: model.TanggalLahir,
    NomorHP: model.NomorHP,
    Email: model.Email,

  }

  if pekerjaan := Map(&model.Pekerjaan, ToPekerjaan); pekerjaan != nil {
    dto.Pekerjaan = *pekerjaan
  }

  if kunjungan := MapSlice(model.Kunjungan, ToKunjungan); kunjungan != nil {
    dto.Kunjungans = kunjungan
  }

  if alergiPasiens := MapSlice(model.AlergiPasiens, ToAlergiPasienBase); alergiPasiens != nil {
    dto.AlergiPasiens = alergiPasiens
  }

  if pantanganPasien := MapSlice(model.PantanganPasien, ToPantanganPasien); pantanganPasien != nil {
    dto.PantanganPasiens = pantanganPasien
  }

  return dto
}
