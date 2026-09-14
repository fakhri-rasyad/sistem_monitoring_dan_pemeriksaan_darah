import z from "zod";

export const RiwayatPenyakitPasienSchema = z.object({
  riwayat_penyakit_public_id: z.guid()
})
