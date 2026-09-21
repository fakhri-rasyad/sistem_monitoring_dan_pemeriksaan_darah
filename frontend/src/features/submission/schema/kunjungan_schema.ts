import z from "zod";

export const KunjunganSchema = z.object({
  tanggal: z
    .iso.datetime("Tanggal kunjungan wajib diisi"),

  tensi: z.string("Tensi tidak boleh kosong").regex(/^\d{2,3}\/\d{2,3}$/, {
    message: "Nilai sistol/diastol hanya menerima format xxx/xxx (e.g., 120/80)",
  })
});
