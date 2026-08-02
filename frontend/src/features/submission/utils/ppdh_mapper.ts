import { PpdhResponse } from "../types/ppdh_response";
import { PpdhData } from "../types/ppdh_data";
export function toPpdhData(p: PpdhResponse): PpdhData {
  return {
    public_id: p.public_id,
    nama: p.nama,
    satuan: p.satuan
  }
}
