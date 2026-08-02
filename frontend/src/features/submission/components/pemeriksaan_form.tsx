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
import { PemeriksaanFormSchema, PemeriksaanFormValues} from "../schema/pemeriksaan_schema";


export default function PemeriksaanForm() {
    const form = useForm<PemeriksaanFormValues>({
        resolver: zodResolver(PemeriksaanFormSchema),

        defaultValues: {
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
              pasien_public_id: ""
            },

            // alergi_pasiens: [],
            // pantangan_pasiens: [],

            // kunjungan: {
            //     tanggal: "",
            //     tensi_sistol: 0,
            //     tensi_diastol: 0,
            // },

            // pemeriksaan: {
            //     diperiksa_at: "",
            //     subjective: "",
            //     objective: "",
            //     evaluasi: "",
            //     planning_terapi: "",
            // },

            // komposisi_tubuh: {
            //     berat_badan: 0,
            //     tinggi_badan: 0,
            //     indeks_massa_tubuh: 0,
            //     air_tubuh: 0,
            //     massa_lemak: 0,
            //     massa_otot: 0,
            //     massa_tulang: 0,
            // },

            // data_labs: [],
        },
    });

    async function onSubmit(values: PemeriksaanFormValues) {
        // const payload = toPayload(values);
        console.log("ran")
        console.log(values);

        // await createPemeriksaan(payload)
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                  console.log(error)
                })}
                className="mx-auto max-w-7xl space-y-6 p-6"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Pasien</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <PatientSection
                          form={form}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Kunjungan</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <KunjunganSection />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pemeriksaan</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <PemeriksaanSection />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Komposisi Tubuh</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <KomposisiTubuhSection />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Laboratorium</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <DataLabSection />
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        size="lg"
                    >
                        Simpan Pemeriksaan
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
