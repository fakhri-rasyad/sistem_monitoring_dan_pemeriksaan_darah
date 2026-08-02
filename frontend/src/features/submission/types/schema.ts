import { z } from "zod";

export const PemeriksaanSchema = z.object({
  pasien_public_id: z.string().optional(),

  pasien: z.object({
    nama: z.string(),
    alamat: z.string(),
    tempat_lahir: z.string(),
    tanggal_lahir: z.string(),
    nomor_hp: z.string(),
    email: z.string().email(),
    pekerjaan_public_id: z.string(),
  }),

  alergi_public_ids: z.array(z.string()),

  pantangan_public_ids: z.array(z.string()),

  kunjungan: z.object({
    tanggal: z.string(),
    tensi_sistol: z.number(),
    tensi_diastol: z.number(),
  }),

  pemeriksaan: z.object({
    diperiksa_at: z.string(),
    subjective: z.string(),
    objective: z.string(),
    evaluasi: z.string(),
    planning_terapi: z.string(),
  }),

  komposisi_tubuh: z.object({
    tinggi_badan: z.number(),
    berat_badan: z.number(),
    indeks_massa_tubuh: z.number(),
    air_tubuh: z.number(),
    massa_otot: z.number(),
    massa_tulang: z.number(),
    massa_lemak: z.number(),
  }),

  data_labs: z.array(
    z.object({
      parameter_public_id: z.string(),
      nilai: z.number(),
    })
  ),
});
