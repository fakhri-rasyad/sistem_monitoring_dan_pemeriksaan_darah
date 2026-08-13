import axios from "axios";
import { api } from "./api";
import { KunjunganData } from "./pasien";
import { ApiResponse } from "./response";

export async function getKunjungan(): Promise<ApiResponse<KunjunganData[]>> {
  try {
    const res = await api.get<ApiResponse<KunjunganData[]>>("/api/v1/kunjungan")
    return res.data
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

export async function getKunjunganDetail(public_id: string): Promise<ApiResponse<KunjunganData>> {
  try {
    console.log(public_id)
    const res = await api.get(`/api/v1/kunjungan/${public_id}`)
    return res.data
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
