import z from "zod"
import { PasienSchema } from "./pasien_schema"
import { AlergiPasienSchema } from "./alergi_pasien_schema"
import { PantanganPasienSchema } from "./pantangan_pasien_schema"
import { RiwayatPenyakitPasienSchema } from "./riwayat_penyakit_pasien_schema"

export const PasienUpdate = z.object({
  pasien: PasienSchema,

  alergi_pasiens: z.array(AlergiPasienSchema),

  pantangan_pasiens: z.array(PantanganPasienSchema),

  riwayat_penyakit_pasiens: z.array(RiwayatPenyakitPasienSchema),
})


export type PasienUpdateValue = z.infer<typeof PasienUpdate>
