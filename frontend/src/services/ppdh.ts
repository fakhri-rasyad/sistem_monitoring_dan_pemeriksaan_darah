import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { PekerjaanResponse } from "@/features/submission/types/pekerjaan_response";
import { ParameterResponse } from "@/features/submission/types/api";
import { PpdhResponse } from "@/features/submission/types/ppdh_response";

export async function getPPDH(): Promise<ParameterResponse[]> {
  try {
    const res = await api.get<ApiResponse<ParameterResponse[]>>("/api/v1/ppdh");
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

export async function AddPPDH(nama: string, satuan: string): Promise<ApiResponse<ParameterResponse>> {
  try {
    const res = await api.post<ApiResponse<ParameterResponse>>("/api/v1/ppdh", {
      "nama": nama,
      "satuan": satuan
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

