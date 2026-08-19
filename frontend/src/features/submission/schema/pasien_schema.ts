import z from "zod";

export const PasienSchema = z.object({
  pasien_create: z.object({
    nama: z.string().min(1, "Nama wajib diisi"),

    alamat: z.string().min(1, "Alamat wajib diisi"),

    tempat_lahir: z.string().min(1, "Tempat lahir wajib diisi"),

    tanggal_lahir: z
      .iso.datetime("Tanggal lahir wajib diisi"),

    nomor_hp: z.e164("Nomor handphone dengan awal (+62)").min(8, "Nomor HP tidak valid"),

    email: z.email("Email tidak valid"),

    pekerjaan_public_id: z.guid("Pekerjaan wajib dipilih"),
  }),
  pasien_public_id: z.string().optional().nullable()
});
