"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import PatientSection from "@/features/submission/components/pasien_section";
import {
  PasienUpdate,
  PasienUpdateValue,
} from "@/features/submission/schema/pasien_update_schema";
import { handleApiError, showToastFromResponse } from "@/lib/utils";
import { getPasienDetail, updatePasien } from "@/services/pasien";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function PasienEditForm() {
  const params = useParams<{ public_id: string }>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const defaultFormValues: PasienUpdateValue = {
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
      pasien_public_id: params.public_id,
    },
    alergi_pasiens: [],
    pantangan_pasiens: [],
    riwayat_penyakit_pasiens: [],
  };

  const form = useForm<PasienUpdateValue>({
    resolver: zodResolver(PasienUpdate),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { reset } = form;

  useEffect(() => {
    async function load() {
      try {
        const data = await getPasienDetail(params.public_id);
        reset({
          pasien: {
            pasien_create: {
              nama: data.nama,
              alamat: data.alamat,
              tempat_lahir: data.tempat_lahir,
              tanggal_lahir: new Date(data.tanggal_lahir).toISOString(),
              nomor_hp: data.nomor_hp,
              email: data.email,
              pekerjaan_public_id: data.pekerjaan.public_id,
            },
            pasien_public_id: params.public_id,
          },
          alergi_pasiens: data.alergi_pasien.map((value) => {
            return { alergi_public_id: value.alergi.public_id };
          }),
          pantangan_pasiens: data.pantangan_pasien.map((value) => {
            return { pantangan_public_id: value.pantangan.public_id };
          }),
          riwayat_penyakit_pasiens: data.riwayat_penyakit_pasien.map(
            (value) => {
              return {
                riwayat_penyakit_public_id: value.riwayat_penyakit.public_id,
              };
            },
          ),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.public_id]);

  async function onSubmit(values: PasienUpdateValue) {
    try {
      const res = await updatePasien(values);

      showToastFromResponse(res);
      if (res.StatusCode >= 200 && res.StatusCode < 300) {
        router.back();
      }
    } catch (e) {
      handleApiError(e);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
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
          <PatientSection />

          <div className="flex flex-end justify-end gap-4">
            <Button type="submit" size="lg">
              Simpan Perubahan
            </Button>
            <Button
              type="button"
              variant={"outline"}
              size={"lg"}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </FormProvider>
  );
}
