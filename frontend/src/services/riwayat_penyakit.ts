import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { RiwayatPenyakitResponse } from "@/features/submission/types/riwayat_penyakit_response";

export async function getRiwayatPenyakit(): Promise<RiwayatPenyakitResponse[]> {
  try {
    const res = await api.get<ApiResponse<RiwayatPenyakitResponse[]>>("/api/v1/riwayat_penyakit");
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

export async function AddRiwayatPenyakit(nama: string): Promise<ApiResponse<RiwayatPenyakitResponse>> {
  try {
    const res = await api.post<ApiResponse<RiwayatPenyakitResponse>>("/api/v1/riwayat_penyakit", {
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

export async function DeleteRiwayatPenyakit(public_id: string): Promise<ApiResponse<null>> {
  try {
    const res = await api.delete<ApiResponse<null>>("/api/v1/riwayat_penyakit", {
      params: {
        public_id: public_id
      }
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
