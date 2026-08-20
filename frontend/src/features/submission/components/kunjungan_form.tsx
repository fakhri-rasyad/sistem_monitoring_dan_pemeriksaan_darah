import { FormProvider, useForm } from "react-hook-form";
import KomposisiTubuhSection from "./komposisi_tubuh_section";
import KunjunganSection from "./kunjungan_section";
import PemeriksaanSection from "./pemeriksaan_section";
import DataLabSection from "./data_lab_section";
import { Button } from "@/components/ui/button";
import {
  KunjunganFormSchema,
  KunjunganFormValue,
} from "../schema/kunjungan_form_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import KunjunganDataLabSection from "./data_lab_kunjugan_section";
import { postKunjunganSubmit } from "@/services/submit";
import { handleApiError, showToastFromResponse } from "@/lib/utils";
import { error } from "console";

interface KunjunganFormProps {
  pasien_public_id: string;
}

export default function KunjunganForm({
  pasien_public_id,
}: KunjunganFormProps) {
  const defaultValue = {
    pasien_public_id: pasien_public_id,
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
  };

  const form = useForm<KunjunganFormValue>({
    resolver: zodResolver(KunjunganFormSchema),
    defaultValues: defaultValue,
  });

  async function onSubmit(values: KunjunganFormValue) {
    try {
      const res = await postKunjunganSubmit(values);

      showToastFromResponse(res);
      if (res.StatusCode >= 200 && res.StatusCode < 300) {
        form.reset(defaultValue);
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

        <KunjunganDataLabSection form={form} />

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Simpan Pemeriksaan
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
