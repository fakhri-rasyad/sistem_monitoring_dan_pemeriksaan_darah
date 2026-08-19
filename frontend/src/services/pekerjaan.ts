import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { PekerjaanResponse } from "@/features/submission/types/pekerjaan_response";

export async function getPekerjaan(): Promise<PekerjaanResponse[]> {
  try {
    const res = await api.get<ApiResponse<PekerjaanResponse[]>>("/api/v1/pekerjaan");
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

export async function AddPekerjaan(nama: string): Promise<ApiResponse<PekerjaanResponse>> {
  try {
    const res = await api.post<ApiResponse<PekerjaanResponse>>("/api/v1/pekerjaan", {
      "nama": nama
    });
    return res.data;
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
