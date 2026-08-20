import axios from "axios";
import { api } from "./api";
import { ApiResponse } from "./response";
import { PemeriksaanPayload } from "@/features/submission/types/payload";
import { PemeriksaanFormValues } from "@/features/submission/schema/pemeriksaan_form_schema";
import { KunjunganFormValue } from "@/features/submission/schema/kunjungan_form_schema";

export async function postSubmit(data: PemeriksaanFormValues): Promise<ApiResponse<boolean>> {
  try {
    const res = await api.post<ApiResponse<boolean>>("/api/v1/checkup", data);
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

export async function postKunjunganSubmit(data: KunjunganFormValue): Promise<ApiResponse<boolean>> {
  try {
    const res = await api.post<ApiResponse<boolean>>("/api/v1/kunjungan/followup", data);
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
