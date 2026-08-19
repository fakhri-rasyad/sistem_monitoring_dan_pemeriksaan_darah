import z from "zod";

export const KomposisiTubuhSchema = z.object({
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
    .positive("Nilai harus lebih dari 0"),

  massa_lemak: z.number({
    error: "Jumlah massa lemak wajib diisi",
  })
    .positive("Nilai harus lebih dari 0"),

  massa_otot: z.number({
    error: "Jumlah massa otot wajib diisi",
  })
    .positive("Nilai harus lebih dari 0"),

  massa_tulang: z.number({
    error: "Jumlah massa tulang wajib diisi",
  })
    .positive("Nilai harus lebih dari 0"),
});
