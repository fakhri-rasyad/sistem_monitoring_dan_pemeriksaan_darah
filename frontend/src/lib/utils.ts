import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/services/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showToastFromResponse(res: ApiResponse<any>) {
  console.log(`api message:  ${res.Message}`)
  if (res.StatusCode >= 200 && res.StatusCode < 300) {
    toast.success(res.Message);
  } else if (res.StatusCode >= 400 && res.StatusCode < 500) {
    toast.error(res.Message, {
      description: res.Error
    });
  } else if (res.StatusCode >= 500) {
    toast.error(res.Message || "Terjadi kesalahan pada server", {
      description: res.Error
    });
  } else {
    toast(res.Message ?? "Unexpected response", {
      description: res.Error
    });
  }
}

export function handleApiError(e: unknown) {
  const err = e as AxiosError<ApiResponse<any>>;
  if (err.response) {
    const data = err.response.data;
    toast.error(data?.Message ?? `Error ${err.response.status}`);
    return;
  }

  if (err.request) {
    toast.error("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
    return;
  }

  toast.error(err.message ?? "Terjadi kesalahan yang tidak diketahui");
}
