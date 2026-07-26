import { PasienData } from "../types/pasien_data_column";
import { PasienResponse } from "../types/pasien_respose";

export function PasienMapper(data: PasienResponse): PasienData {
  return {
    public_id: data.public_id,
    nama: data.nama,
    pekerjaan: data.pekerjaan.nama,
    tanggalLahir: data.tanggal_lahir,
  }
}
