import z from "zod";

export const AlergiPasienSchema = z.object({
  alergi_public_id: z.guid()
})
