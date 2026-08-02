"use client";

import { FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toPayload } from "../mapper/toPayload";
import { PemeriksaanFormSchema, PemeriksaanFormValues } from "../schema/pemeriksaan_schema";
import PatientSection from "./pasien_section";
import KunjunganSection from "./kunjungan_section";
import PemeriksaanSection from "./pemeriksaan_section";
import KomposisiTubuhSection from "./komposisi_tubuh_section";
import DataLabSection from "./data_lab_section";


export default function PemeriksaanForm() {
    const form = useForm<PemeriksaanFormValues>({
        resolver: zodResolver(PemeriksaanFormSchema),

        defaultValues: {
            patientMode: "existing",

            pasienPublicID: "",

            pasien: {
                nama: "",
                alamat: "",
                tempatLahir: "",
                tanggalLahir: undefined,
                nomorHP: "",
                email: "",
                pekerjaanPublicID: "",
            },

            alergi: [],
            pantangan: [],

            kunjungan: {
                tanggal: new Date(),
                tensiSistol: 0,
                tensiDiastol: 0,
            },

            pemeriksaan: {
                diperiksaAt: new Date(),
                subjective: "",
                objective: "",
                evaluasi: "",
                planningTerapi: "",
            },

            komposisiTubuh: {
                beratBadan: 0,
                tinggiBadan: 0,
                indeksMassaTubuh: 0,
                airTubuh: 0,
                massaLemak: 0,
                massaOtot: 0,
                massaTulang: 0,
            },

            dataLabs: [],
        },
    });

    async function onSubmit(values: PemeriksaanFormValues) {
        const payload = toPayload(values);

        console.log(payload);

        // await createPemeriksaan(payload)
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto max-w-7xl space-y-6 p-6"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Pasien</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <PatientSection />
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
