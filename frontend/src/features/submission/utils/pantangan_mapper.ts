import { PantanganResponse } from "../types/pantangan_response";
import { PantanganData } from "../types/pantangan_data";
export function toPantanganData(p: PantanganResponse): PantanganData {
  return {
    public_id: p.public_id,
    nama: p.nama,
  }
}
