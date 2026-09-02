import z from "zod";
import { DataLabSchema } from "./data_lab_schema";
import { KomposisiTubuhSchema } from "./komposisi_tubuh_schema";
import { KunjunganSchema } from "./kunjungan_schema";
import { PemeriksaanSchema } from "./pemeriksaan_schema";
import { TagihanSchema } from "./tagihan_schema";

export const KunjunganFormSchema = z.object({
  pasien_public_id: z.string(),

  kunjungan: KunjunganSchema,

  komposisi_tubuh: KomposisiTubuhSchema,

  data_labs: z.array(DataLabSchema),

  pemeriksaan: PemeriksaanSchema,

  tagihan: TagihanSchema,
})

export type KunjunganFormValue = z.infer<typeof KunjunganFormSchema>;
