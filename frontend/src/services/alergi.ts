import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { AlergiResponse } from "@/features/submission/types/alergi_response";

export async function getAlergi(): Promise<AlergiResponse[]> {
  try {
    const res = await api.get<ApiResponse<AlergiResponse[]>>("/api/v1/alergi");
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

export async function AddAlergi(nama: string): Promise<ApiResponse<AlergiResponse>> {
  try {
    const res = await api.post<ApiResponse<AlergiResponse>>("/api/v1/alergi", {
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

