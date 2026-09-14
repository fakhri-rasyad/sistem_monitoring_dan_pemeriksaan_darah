import z from "zod"

export const PasienUpdate = z.object({
  public_id: z.string("Wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
})


export type PasienUpdateValue = z.infer<typeof PasienUpdate>
