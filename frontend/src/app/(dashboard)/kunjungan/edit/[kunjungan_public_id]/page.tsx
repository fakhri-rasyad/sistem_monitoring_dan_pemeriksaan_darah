"use client";

import { useParams, useRouter } from "next/navigation";
import KunjunganForm from "@/features/submission/components/kunjungan_form";
import { MetodePembayaran } from "@/enum/metode_pembayaran";
import {
  KunjunganUpdateSchema,
  KunjunganUpdateValue,
} from "@/features/submission/schema/kunjungan_update_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError, showToastFromResponse } from "@/lib/utils";
import { postKunjunganSubmit, updateKunjunganSubmit } from "@/services/submit";
import { FormProvider, useForm } from "react-hook-form";
import KunjunganSection from "@/features/submission/components/kunjungan_section";
import KomposisiTubuhSection from "@/features/submission/components/komposisi_tubuh_section";
import PemeriksaanSection from "@/features/submission/components/pemeriksaan_section";
import DataLabSection from "@/features/submission/components/data_lab_section";
import TagihanSection from "@/features/submission/components/tagihan_section";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getKunjunganDetail } from "@/services/kunjungan";
import { toast } from "sonner";

export default function EditKunjunganPage() {
  const params = useParams<{ kunjungan_public_id: string }>();
  const router = useRouter();

  const defaultValue = {
    kunjungan_public_id: params.kunjungan_public_id,
    kunjungan: {
      tanggal: "",
      tensi: "",
    },

    pemeriksaan: {
      diperiksa_at: "",
      subjective: "",
      objective: "",
      evaluasi: "",
      planning_terapi: "",
    },

    komposisi_tubuh: {
      berat_badan: 1,
      tinggi_badan: 1,
      indeks_massa_tubuh: 0,
      air_tubuh: 0,
      massa_lemak: 0,
      massa_otot: 0,
      massa_tulang: 0,
    },

    data_labs: [],
    tagihan: {
      biaya_konsultasi: 150000,
      biaya_alat: 0,
      metode_pembayaran: MetodePembayaran.Cash,
    },
  };

  const form = useForm<KunjunganUpdateValue>({
    resolver: zodResolver(KunjunganUpdateSchema),
    defaultValues: defaultValue,
  });

  const { reset } = form;

  useEffect(() => {
    async function load() {
      try {
        const res = await getKunjunganDetail(params.kunjungan_public_id);
        const Data = res.Data;

        reset({
          kunjungan_public_id: params.kunjungan_public_id,
          kunjungan: {
            tanggal: new Date(Data.tanggal).toISOString(),
            tensi: Data.tensi,
          },
          pemeriksaan: {
            diperiksa_at: new Date(Data.pemeriksaan.diperiksa_at).toISOString(),
            subjective: Data.pemeriksaan.subjective,
            objective: Data.pemeriksaan.objective,
            evaluasi: Data.pemeriksaan.evaluasi,
            planning_terapi: Data.pemeriksaan.planning_terapi,
          },
          komposisi_tubuh: {
            berat_badan: Data.komposisi_tubuh.berat_badan,
            tinggi_badan: Data.komposisi_tubuh.tinggi_badan,
            indeks_massa_tubuh: Data.komposisi_tubuh.indeks_massa_tubuh,
            air_tubuh: Data.komposisi_tubuh.air_tubuh,
            massa_lemak: Data.komposisi_tubuh.massa_lemak,
            massa_otot: Data.komposisi_tubuh.massa_otot,
            massa_tulang: Data.komposisi_tubuh.massa_tulang,
          },
          data_labs: Data.data_lab.map((item) => ({
            parameter_public_id: item.parameter.public_id,
            nilai: item.nilai,
          })),
          tagihan: {
            biaya_konsultasi: Data.tagihan.biaya_konsultasi,
            biaya_alat: Data.tagihan.biaya_alat,
            metode_pembayaran:
              Object.values(MetodePembayaran).find(
                (value) => value === Data.tagihan.metode_pembayaran,
              ) ?? MetodePembayaran.Cash,
          },
        });
      } catch (e) {
        toast.error("Gagal mengambil data kunjungan");
      }
    }

    load();
  }, [params.kunjungan_public_id, reset]);
  async function onSubmit(values: KunjunganUpdateValue) {
    try {
      const res = await updateKunjunganSubmit(values);

      showToastFromResponse(res);
      if (res.StatusCode >= 200 && res.StatusCode < 300) {
        router.back();
      }
    } catch (e) {
      handleApiError(e);
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <KunjunganSection />
          <KomposisiTubuhSection />
        </div>

        <PemeriksaanSection />

        <DataLabSection />

        <TagihanSection />

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Simpan perubahan
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
