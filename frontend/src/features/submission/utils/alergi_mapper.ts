import { AlergiResponse } from "../types/alergi_response";
import { AlergiData } from "../types/alergi_data";
export function toAlergiData(a: AlergiResponse): AlergiData {
  return {
    public_id: a.public_id,
    nama: a.nama,
  }
}
