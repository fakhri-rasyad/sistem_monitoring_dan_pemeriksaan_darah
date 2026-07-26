import { PekerjaanResponse } from "./pekerjaan_response";

export interface PasienResponse {
  public_id: string,
  nama: string,
  pekerjaan: PekerjaanResponse,
  tanggal_lahir: string
}
