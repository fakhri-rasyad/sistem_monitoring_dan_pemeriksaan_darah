import { z } from "zod";

const PasienSchema = z.object({
  pasien_create: z.object({
    nama: z.string().min(1, "Nama wajib diisi"),

    alamat: z.string().min(1, "Alamat wajib diisi"),

    tempat_lahir: z.string().min(1, "Tempat lahir wajib diisi"),

    tanggal_lahir: z.string().min(1, "Tanggal lahir wajib diisi").transform(value => new Date(value).toISOString()),

    nomor_hp: z.e164("Nomor handphone dengan awal (+62)").min(8, "Nomor HP tidak valid"),

    email: z.email("Email tidak valid"),

    pekerjaan_public_id: z.guid("Pekerjaan wajib dipilih"),
  }),
  pasien_public_id: z.string().optional()
});

const KunjunganSchema = z.object({
  tanggal: z.string().min(1, "Tanggal wajib diisi").transform(value => new Date(value).toISOString()),

  tensi_sistol: z
    .number("Nilai sistol harus bulat dan lebih dari -1")
    .min(0, "Nilai sistol harus bulat dan lebih dari -1"),

  tensi_diastol: z
    .number("Nilai diastol harus bulat dan lebih dari -1")
    .min(0, "Nilai diastol harus bulat dan lebih dari -1")
});

const PemeriksaanSchema = z.object({
  diperiksa_at: z.string().min(1, "Tanggal wajib diisi").transform(value => new Date(value).toISOString()),

  subjective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  objective: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  evaluasi: z.string().min(1, "Wajib diisi. Isi dengan - jika tidak ada"),

  planning_terapi: z.string(),
});

const KomposisiTubuhSchema = z.object({
  berat_badan: z.number({
    error: "Berat badan wajib diisi",
  }).min(1, "Berat badan tidak boleh kosong")
    .positive("Berat badan tidak bisa minus"),

  tinggi_badan: z.number({
    error: "Tinggi badan wajib diisi",
  }).min(1, "Tinggi badan tidak boleh kosong")
    .positive("Tinggi badan tidak bisa minus"),

  indeks_massa_tubuh: z.number({
    error: "Indeks massa tubuh wajib diisi",
  })
    .positive(),

  air_tubuh: z.number({
    error: "Jumlah air tubuh wajib diisi",
  })
    .positive(),

  massa_lemak: z.number({
    error: "Jumlah massa lemak wajib diisi",
  })
    .positive(),

  massa_otot: z.number({
    error: "Jumlah massa otot wajib diisi",
  })
    .positive(),
  massa_tulang: z.number({
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

    komposisi_tubuh: KomposisiTubuhSchema,

    data_labs: z.array(DataLabSchema),

    // pemeriksaan: PemeriksaanSchema,
  });

export type PemeriksaanFormValues = z.infer<
  typeof PemeriksaanFormSchema
>;
