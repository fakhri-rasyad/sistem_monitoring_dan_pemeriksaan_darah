import z from "zod"

export const PasienUpdate = z.object({
  public_id: z.string("Wajib diisi"),
  nama: z.string().min(1, "Nama wajib diisi").optional(),
  alamat: z.string().min(1, "Alamat wajib diisi").optional(),
  tempat_lahir: z.string().min(1, "Tempat lahir wajib diisi").optional(),
  tanggal_lahir: z
    .iso.datetime("Tanggal lahir wajib diisi").optional(),
  nomor_hp: z.string("Nomor tidak boleh kosong").min(8, "Nomor HP tidak valid").optional(),
  email: z.email("Email tidak valid").optional(),

  pekerjaan_public_id: z.guid("Pekerjaan wajib dipilih").optional(),
})


export type PasienUpdateValue = z.infer<typeof PasienUpdate>
