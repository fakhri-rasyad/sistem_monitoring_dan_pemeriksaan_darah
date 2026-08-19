import z from "zod";

export const KunjunganSchema = z.object({
  tanggal: z
    .iso.datetime("Tanggal kunjungan wajib diisi"),

  tensi: z.string("Tensi tidak boleh kosong")
});
