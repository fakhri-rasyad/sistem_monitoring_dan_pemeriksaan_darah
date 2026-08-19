import z from "zod";

export const PemeriksaanSchema = z.object({
  diperiksa_at: z
    .iso.datetime("Tanggal pemeriksaan wajib diisi"),

  subjective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  objective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  evaluasi: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  planning_terapi: z.string().optional(),
});
