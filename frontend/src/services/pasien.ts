import { PasienResponse } from "@/features/dashboard/types/pasien_respose";
import { api } from "./api";
import { ApiResponse } from "./response";
import axios from "axios";

export async function getPasien(): Promise<PasienResponse[]> {
  try {
    const res = await api.get<ApiResponse<PasienResponse[]>>(
      "/api/v1/pasien"
    );

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

  const res = await api.get<ApiResponse<PatientOption[]>>(
    "/api/v1/pasien/search",
    {
      params: {
        q: query,
      },
    }
  );

  return res.data.Data;
}


export async function DeletePasien(public_id: string): Promise<ApiResponse<null>> {
  try {
    const res = await api.delete<ApiResponse<null>>("/api/v1/pasien", {
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


// ==============================
// DETAIL PASIEN
// ==============================

export interface PekerjaanData {
  public_id: string;
  nama: string;
}

export interface AlergiData {
  public_id: string;
  nama: string;
}

export interface AlergiPasienData {
  public_id: string;
  alergi: AlergiData;
}

export interface PantanganData {
  public_id: string;
  nama: string;
}

export interface PantanganPasienData {
  public_id: string;
  pantangan: PantanganData;
}

export interface ParameterData {
  public_id: string;
  nama: string;
  satuan: string;
}

export interface DataLabData {
  public_id: string;
  nilai: number;
  parameter: ParameterData;
}

export interface KomposisiTubuhData {
  public_id: string;
  berat_badan: number;
  tinggi_badan: number;
  massa_lemak: number;
  massa_otot: number;
  massa_tulang: number;
  air_tubuh: number;
  indeks_massa_tubuh: number;
}

export interface PemeriksaanData {
  public_id: string;
  subjective: string;
  objective: string;
  planning_terapi: string;
  evaluasi: string;
  diperiksa_at: string;
}

export interface KunjunganData {
  public_id: string;
  tanggal: string;
  tensi: string;
  komposisi_tubuh: KomposisiTubuhData;
  data_lab: DataLabData[];
  pemeriksaan: PemeriksaanData;
  pasien: PasienResponse;
  tagihan: TagihanResponse;
}

export interface TagihanResponse {
  public_id: string;
  biaya_konsultasi: number;
  biaya_alat: number;
  metode_pembayaran: string;
}

export interface PasienDetailResponse {
  public_id: string;
  nama: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nomor_hp: string;
  email: string;

  pekerjaan: PekerjaanData;

  alergi_pasien: AlergiPasienData[];

  pantangan_pasien: PantanganPasienData[];

  kunjungan: KunjunganData[];
}


// GET /api/v1/pasien/detail?public_id=...
export async function getPasienDetail(
  publicId: string
): Promise<PasienDetailResponse> {
  try {
    const res = await api.get<ApiResponse<PasienDetailResponse>>(
      "/api/v1/pasien/detail",
      {
        params: {
          public_id: publicId,
        },
      }
    );

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
