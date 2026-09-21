import { MetodePembayaran } from "@/enum/metode_pembayaran";
import zod, { z } from "zod";
import { TagihanSchema } from "./tagihan_schema";
import { KunjunganSchema } from "./kunjungan_schema";
import { KomposisiTubuhSchema } from "./komposisi_tubuh_schema";
import { DataLabSchema } from "./data_lab_schema";
import { PemeriksaanSchema } from "./pemeriksaan_schema";

export const KunjunganUpdateSchema = zod.object({
  kunjungan_public_id: zod.guid(),
  kunjungan: KunjunganSchema,

  komposisi_tubuh: KomposisiTubuhSchema,

  data_labs: z.array(DataLabSchema),

  pemeriksaan: PemeriksaanSchema,

  tagihan: TagihanSchema,

})

export type KunjunganUpdateValue = zod.infer<typeof KunjunganUpdateSchema>
