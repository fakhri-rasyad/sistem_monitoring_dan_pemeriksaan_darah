import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { PantanganResponse } from "@/features/submission/types/pantangan_response";

export async function getPantangan(): Promise<PantanganResponse[]> {
  try {
    const res = await api.get<ApiResponse<PantanganResponse[]>>("/api/v1/pantangan");
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
