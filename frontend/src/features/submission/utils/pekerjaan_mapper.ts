
import { PekerjaanData } from "../types/pekerjaan_data";
import { PekerjaanResponse } from "../types/pekerjaan_response";
export function toPekerjaanData(p: PekerjaanResponse): PekerjaanData {
  return {
    public_id: p.public_id,
    nama: p.nama,
  }
}
