import { z } from "zod";

const PasienSchema = z.object({
  pasien_create: z.object({
    nama: z.string().min(1, "Nama wajib diisi"),

    alamat: z.string().min(1, "Alamat wajib diisi"),

    tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),

    tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi").transform(value => new Date(value).toISOString()),

    nomorHP: z.e164("Nomor handphone dengan awal (+62)").min(8, "Nomor HP tidak valid"),

    email: z.email("Email tidak valid"),

    pekerjaanPublicID: z.guid("Pekerjaan wajib dipilih"),
  }),
  pasien_public_id: z.guid().optional()
});

const KunjunganSchema = z.object({
  tanggal: z.string().min(1, "Tanggal wajib diisi").transform(value => new Date(value).toISOString()),

  tensiSistol: z
    .number()
    .min(0)
    .max(300),

  tensiDiastol: z
    .number()
    .min(0)
    .max(300),
});

const PemeriksaanSchema = z.object({
  diperiksaAt: z.string().min(1, "Tanggal wajib diisi").transform(value => new Date(value).toISOString()),

  subjective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  objective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  evaluasi: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  planningTerapi: z.string(),
});

const KomposisiTubuhSchema = z.object({
  beratBadan: z.number({
    error: "Berat badan wajib diisi",
  })
    .positive(),

  tinggiBadan: z.number({
    error: "Tinggi badan wajib diisi",
  })
    .positive(),

  indeksMassaTubuh: z.number({
    error: "Indeks massa tubuh wajib diisi",
  })
    .positive(),

  airTubuh: z.number({
    error: "Jumlah air tubuh wajib diisi",
  })
    .positive(),

  massaLemak: z.number({
    error: "Jumlah massa lemak wajib diisi",
  })
    .positive(),

  massaOtot: z.number({
    error: "Jumlah massa otot wajib diisi",
  })
    .positive(),
  massaTulang: z.number({
    error: "Jumlah massa tulang wajib diisi",
  })
    .positive(),
});

const AlergiPasienSchema = z.object({
  alergi_public_id: z.guid()
})

const PantanganPasienSchema = z.object({
  pantangan_public_id: z.guid()
})

const DataLabSchema = z.object({
  parameter_public_id: z.guid(),
  nilai: z.number(),
});

export const PemeriksaanFormSchema = z
  .object({
    pasien: PasienSchema,

    alergi_pasiens: z.array(AlergiPasienSchema),

    pantangan_pasiens: z.array(PantanganPasienSchema),

    kunjungan: KunjunganSchema,

    pemeriksaan: PemeriksaanSchema,

    komposisi_tubuh: KomposisiTubuhSchema,

    data_labs: z.array(DataLabSchema),
  });

export type PemeriksaanFormValues = z.infer<
  typeof PemeriksaanFormSchema
>;
