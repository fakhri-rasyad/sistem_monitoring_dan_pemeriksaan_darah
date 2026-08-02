import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PemeriksaanForm } from "../types/form";
import { PemeriksaanSchema } from "../types/schema";

export function usePemeriksaanForm() {
  return useForm<PemeriksaanForm>({
    resolver: zodResolver(PemeriksaanSchema),

    defaultValues: {
      pasien_public_id: "",

      pasien: {
        nama: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nomor_hp: "",
        email: "",
        pekerjaan_public_id: "",
      },

      alergi_public_ids: [],

      pantangan_public_ids: [],

      kunjungan: {
        tanggal: "",
        tensi_sistol: 0,
        tensi_diastol: 0,
      },

      pemeriksaan: {
        diperiksa_at: "",
        subjective: "",
        objective: "",
        evaluasi: "",
        planning_terapi: "",
      },

      komposisi_tubuh: {
        tinggi_badan: 0,
        berat_badan: 0,
        indeks_massa_tubuh: 0,
        air_tubuh: 0,
        massa_otot: 0,
        massa_tulang: 0,
        massa_lemak: 0,
      },

      data_labs: [],
    },
  });
}
