import { z } from "zod";
import { AlergiPasienSchema } from "./alergi_pasien_schema";
import { DataLabSchema } from "./data_lab_schema";
import { KomposisiTubuhSchema } from "./komposisi_tubuh_schema";
import { KunjunganSchema } from "./kunjungan_schema";
import { PantanganPasienSchema } from "./pantangan_pasien_schema";
import { PemeriksaanSchema } from "./pemeriksaan_schema";
import { PasienSchema } from "./pasien_schema";

export const PemeriksaanFormSchema = z
  .object({
    pasien: PasienSchema,

    alergi_pasiens: z.array(AlergiPasienSchema),

    pantangan_pasiens: z.array(PantanganPasienSchema),

    kunjungan: KunjunganSchema,

    komposisi_tubuh: KomposisiTubuhSchema,

    data_labs: z.array(DataLabSchema),

    pemeriksaan: PemeriksaanSchema,
  });

export type PemeriksaanFormValues = z.infer<
  typeof PemeriksaanFormSchema
>;
