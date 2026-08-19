import z from "zod";

export const PantanganPasienSchema = z.object({
  pantangan_public_id: z.guid()
})
