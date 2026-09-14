import { z } from "zod";
import { AlergiPasienSchema } from "./alergi_pasien_schema";
import { DataLabSchema } from "./data_lab_schema";
import { KomposisiTubuhSchema } from "./komposisi_tubuh_schema";
import { KunjunganSchema } from "./kunjungan_schema";
import { PantanganPasienSchema } from "./pantangan_pasien_schema";
import { PemeriksaanSchema } from "./pemeriksaan_schema";
import { PasienSchema } from "./pasien_schema";
import { TagihanSchema } from "./tagihan_schema";
import { RiwayatPenyakitPasienSchema } from "./riwayat_penyakit_pasien_schema";

export const PemeriksaanFormSchema = z
  .object({
    pasien: PasienSchema,

    alergi_pasiens: z.array(AlergiPasienSchema),

    pantangan_pasiens: z.array(PantanganPasienSchema),

    riwayat_penyakit_pasiens: z.array(RiwayatPenyakitPasienSchema),

    kunjungan: KunjunganSchema,

    komposisi_tubuh: KomposisiTubuhSchema,

    data_labs: z.array(DataLabSchema),

    pemeriksaan: PemeriksaanSchema,

    tagihan: TagihanSchema,
  }).superRefine((data, ctx) => {
    const tanggal_lahir = new Date(data.pasien.pasien_create.tanggal_lahir)
    const tanggal_kunjungan = new Date(data.kunjungan.tanggal)
    const tanggal_pemeriksaan = new Date(data.pemeriksaan.diperiksa_at)
    if (tanggal_kunjungan < tanggal_lahir) {
      ctx.addIssue({
        code: "custom",
        message: "Tanggal kunjungan tidak bisa sebelum kelahiran",
        path: ["kunjungan", "tanggal"]
      })
    }

    if (tanggal_pemeriksaan < tanggal_lahir) {
      ctx.addIssue({
        code: "custom",
        message: "Tanggal pemeriksaan tidak bisa sebelum kelahiran",
        path: ["pemeriksaan", "diperiksa_at"]
      })
    }

  });

export type PemeriksaanFormValues = z.infer<
  typeof PemeriksaanFormSchema
>;
