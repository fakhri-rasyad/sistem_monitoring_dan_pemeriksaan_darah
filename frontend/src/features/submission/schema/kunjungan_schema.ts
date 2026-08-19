import z from "zod";

export const KunjunganSchema = z.object({
  tanggal: z
    .iso.datetime("Tanggal kunjungan wajib diisi"),
  tensi_sistol: z
    .number("Nilai sistol harus bulat dan lebih dari -1")
    .positive("Nilai sistol harus bulat dan lebih dari 0"),

  tensi_diastol: z
    .number("Nilai diastol harus bulat dan lebih dari -1")
    .positive("Nilai diastol harus bulat dan lebih dari 0")
});
