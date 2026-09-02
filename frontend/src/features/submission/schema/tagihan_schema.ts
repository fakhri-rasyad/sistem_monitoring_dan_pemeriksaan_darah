import { MetodePembayaran } from "@/enum/metode_pembayaran";
import zod from "zod";

export const TagihanSchema = zod.object({
  biaya_konsultasi: zod.int("Tidak boleh kosong").positive("Tidak boleh kurang dari 0"),
  biaya_alat: zod.int("Tidak boleh kosong").positive("Tidak boleh kurang dari 0"),
  metode_pembayaran: zod.enum(MetodePembayaran)
})
