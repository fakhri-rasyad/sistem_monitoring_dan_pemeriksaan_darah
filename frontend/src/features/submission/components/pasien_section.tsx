"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";


import { getPasien } from "@/services/pasien";
import { getPekerjaan } from "@/services/pekerjaan";
import { getAlergi } from "@/services/alergi";
import { getPantangan } from "@/services/pantangan";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";
import { PasienMapper } from "@/features/dashboard/utils/pasien_mapper";
import { toPekerjaanData } from "../utils/pekerjaan_mapper";
import { toAlergiData } from "../utils/alergi_mapper";
import { toPantanganData } from "../utils/pantangan_mapper";
import { PekerjaanResponse } from "../types/pekerjaan_response";
import { AlergiResponse } from "../types/alergi_response";
import { PantanganResponse } from "../types/pantangan_response";
import { PasienResponse } from "../types/response";

interface Patient {
  public_id: string;
  nama: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nomor_hp: string;
  email: string;

  alergi_pasien: {
    public_id: string;
    nama: string;
  }[];

  pantangan_pasien: {
    public_id: string;
    nama: string;
  }[];
}

interface Option {
  public_id: string;
  nama: string;
}

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function PatientSection({ form }: Props) {
  const { register, watch, setValue } = form;

  const patientMode = watch("patientMode");

  const [patients, setPatients] = useState<PasienResponse[]>([]);
  const [jobs, setJobs] = useState<PekerjaanResponse[]>([]);
  const [allergies, setAllergies] = useState<AlergiResponse[]>([]);
  const [pantangan, setPantangan] = useState<PantanganResponse[]>([]);

  useEffect(() => {
    async function load() {
      const [p, j, a, pa] = await Promise.all([
        getPasien(),
        getPekerjaan(),
        getAlergi(),
        getPantangan(),
      ]);

      setPatients(p.map(PasienMapper));
      setJobs(j.map(toPekerjaanData));
      setAllergies(a.map(toAlergiData));
      setPantangan(pa.map(toPantanganData));
    }

    load();
  }, []);

  const handlePatientChange = (id: string) => {
    setValue("pasienPublicID", id);

    const patient = patients.find((x) => x.public_id === id);

    if (!patient) return;

    setValue(
      "alergi",
      patient.namamap((x) => x.public_id)
    );

    setValue(
      "pantangan",
      patient.pantangan_pasien.map((x) => x.public_id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pasien</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* MODE */}

        <div className="flex gap-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={patientMode === "new"}
              onChange={() => setValue("patientMode", "new")}
            />
            Pasien Baru
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={patientMode === "existing"}
              onChange={() => setValue("patientMode", "existing")}
            />
            Pasien Lama
          </label>
        </div>

        {/* EXISTING */}

        {patientMode === "existing" && (
          <div className="space-y-2">
            <Label>Pilih Pasien</Label>

            <Select
              value={watch("pasienPublicID")}
              onValueChange={handlePatientChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih pasien" />
              </SelectTrigger>

              <SelectContent>
                {patients.map((p) => (
                  <SelectItem
                    key={p.public_id}
                    value={p.public_id}
                  >
                    {p.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* NEW PATIENT */}

        {patientMode === "new" && (
          <>
            <div>
              <Label>Nama</Label>
              <Input {...register("pasien.nama")} />
            </div>

            <div>
              <Label>Alamat</Label>
              <Input {...register("pasien.alamat")} />
            </div>

            <div>
              <Label>Tempat Lahir</Label>
              <Input {...register("pasien.tempatLahir")} />
            </div>

            <div>
              <Label>Tanggal Lahir</Label>
              <Input
                type="date"
                {...register("pasien.tanggalLahir", {
                  valueAsDate: true,
                })}
              />
            </div>

            <div>
              <Label>Nomor HP</Label>
              <Input {...register("pasien.nomorHP")} />
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("pasien.email")} />
            </div>

            <div>
              <Label>Pekerjaan</Label>

              <Select
                onValueChange={(v) =>
                  setValue("pasien.pekerjaanPublicID", v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pekerjaan" />
                </SelectTrigger>

                <SelectContent>
                  {jobs.map((j) => (
                    <SelectItem
                      key={j.public_id}
                      value={j.public_id}
                    >
                      {j.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* ALERGI */}

        <div>
          <Label>Alergi</Label>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {allergies.map((a) => (
              <label
                key={a.public_id}
                className="flex gap-2 items-center"
              >
                <input
                  type="checkbox"
                  checked={watch("alergi").includes(a.public_id)}
                  onChange={(e) => {
                    const current = watch("alergi");

                    if (e.target.checked) {
                      setValue("alergi", [...current, a.public_id]);
                    } else {
                      setValue(
                        "alergi",
                        current.filter((x) => x !== a.public_id)
                      );
                    }
                  }}
                />

                {a.nama}
              </label>
            ))}
          </div>
        </div>

        {/* PANTANGAN */}

        <div>
          <Label>Pantangan</Label>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {pantangan.map((p) => (
              <label
                key={p.public_id}
                className="flex gap-2 items-center"
              >
                <input
                  type="checkbox"
                  checked={watch("pantangan").includes(p.public_id)}
                  onChange={(e) => {
                    const current = watch("pantangan");

                    if (e.target.checked) {
                      setValue("pantangan", [...current, p.public_id]);
                    } else {
                      setValue(
                        "pantangan",
                        current.filter((x) => x !== p.public_id)
                      );
                    }
                  }}
                />

                {p.nama}
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
