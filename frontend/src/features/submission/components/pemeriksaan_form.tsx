"use client";

import { FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// import { toPayload } from "../mapper/toPayload";
import PatientSection from "./pasien_section";
import KunjunganSection from "./kunjungan_section";
import PemeriksaanSection from "./pemeriksaan_section";
import KomposisiTubuhSection from "./komposisi_tubuh_section";
import DataLabSection from "./data_lab_section";
import {
  PemeriksaanFormSchema,
  PemeriksaanFormValues,
} from "../schema/pemeriksaan_form_schema";
import { postSubmit } from "@/services/submit";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { AxiosError } from "axios";
import { handleApiError, showToastFromResponse } from "@/lib/utils";
import { useEffect } from "react";

export default function PemeriksaanForm() {
  const defaultFormValues: PemeriksaanFormValues = {
    pasien: {
      pasien_create: {
        nama: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nomor_hp: "",
        email: "",
        pekerjaan_public_id: "",
      },
      pasien_public_id: null,
    },
    alergi_pasiens: [],
    pantangan_pasiens: [],
    kunjungan: { tanggal: "", tensi: "" },
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

  const form = useForm<PemeriksaanFormValues>({
    resolver: zodResolver(PemeriksaanFormSchema),
    defaultValues: defaultFormValues,
  });
  async function onSubmit(values: PemeriksaanFormValues) {
    try {
      const res = await postSubmit(values);

      showToastFromResponse(res);
      if (res.StatusCode >= 200 && res.StatusCode < 300) {
        form.reset(defaultFormValues);
      }
    } catch (e) {
      handleApiError(e);
    }
  }

  return (
    <FormProvider {...form}>
      <Dialog>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
          className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6"
        >
          <PatientSection form={form} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KunjunganSection />
            <KomposisiTubuhSection />
          </div>

          <PemeriksaanSection />

          <DataLabSection form={form} />

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Simpan Pemeriksaan
            </Button>
          </div>
        </form>
      </Dialog>
    </FormProvider>
  );
}
