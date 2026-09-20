import z from "zod";

export const KomposisiTubuhSchema = z.object({
  berat_badan: z.number({
    error: "Berat badan wajib diisi",
  })
    .nonnegative("Berat badan tidak bisa minus"),

  tinggi_badan: z.number({
    error: "Tinggi badan wajib diisi",
  })
    .nonnegative("Tinggi badan tidak bisa minus"),

  indeks_massa_tubuh: z.number({
    error: "Indeks massa tubuh wajib diisi",
  })
    .nonnegative(),

  air_tubuh: z.number({
    error: "Jumlah air tubuh wajib diisi",
  })
    .nonnegative("Nilai tidak bisa negatif"),

  massa_lemak: z.number({
    error: "Jumlah massa lemak wajib diisi",
  })
    .nonnegative("Nilai tidak bisa negatif"),

  massa_otot: z.number({
    error: "Jumlah massa otot wajib diisi",
  })
    .nonnegative("Nilai tidak bisa negatif"),

  massa_tulang: z.number({
    error: "Jumlah massa tulang wajib diisi",
  })
    .nonnegative("Nilai tidak bisa negatif"),
});
