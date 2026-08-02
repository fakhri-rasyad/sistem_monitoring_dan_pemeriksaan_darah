import { PasienResponse } from "@/features/dashboard/types/pasien_respose";
import { api } from "./api";
import { ApiResponse } from "./response";
import axios from "axios";

export async function getPasien(): Promise<PasienResponse[]> {
  try {
    const res = await api.get<ApiResponse<PasienResponse[]>>("/api/v1/pasien");
    console.log(res.data)
    return res.data.Data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);
      console.error("URL:", err.config?.url);
    } else {
      console.error(err);
    }

    throw err;
  }
}

export interface PatientOption {
  public_id: string;
  nama: string;
  nomor_hp: string;
}

export async function searchPasien(
  query: string
): Promise<PatientOption[]> {

  if (!query.trim()) return [];

  const res =
    await api.get<ApiResponse<PatientOption[]>>(
      "/api/v1/pasien/search",
      {
        params: {
          q: query,
        },
      }
    );

  return res.data.Data;
}
