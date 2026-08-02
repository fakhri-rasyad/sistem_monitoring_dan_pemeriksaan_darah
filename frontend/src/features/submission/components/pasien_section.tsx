"use client";

import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { getPekerjaan } from "@/services/pekerjaan";
import { getAlergi } from "@/services/alergi";
import { getPantangan } from "@/services/pantangan";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldGroup,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";
import { toPekerjaanData } from "../utils/pekerjaan_mapper";
import { toAlergiData } from "../utils/alergi_mapper";
import { toPantanganData } from "../utils/pantangan_mapper";
import { PekerjaanResponse } from "../types/pekerjaan_response";
import { AlergiResponse } from "../types/alergi_response";
import { PantanganResponse } from "../types/pantangan_response";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function PatientSection({ form }: Props) {
  const { watch, control } = form;

  const [jobs, setJobs] = useState<PekerjaanResponse[]>([]);
  const [allergies, setAllergies] = useState<AlergiResponse[]>([]);
  const [pantangan, setPantangan] = useState<PantanganResponse[]>([]);

  useEffect(() => {
    async function load() {
      const [j, a, pa] = await Promise.all([
        getPekerjaan(),
        getAlergi(),
        getPantangan(),
      ]);

      setJobs(j.map(toPekerjaanData));
      setAllergies(a.map(toAlergiData));
      setPantangan(pa.map(toPantanganData));
    }

    load();
  }, []);

  const selectedPekerjaan = watch("pasien.pasien_create.pekerjaan_public_id");
  const currentPekerjaan = jobs.find(
    (value) => value.public_id == selectedPekerjaan,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pasien</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name={"pasien.pasien_create.nama"}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Pasien</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.nama"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={"pasien.pasien_create.alamat"}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Alamat Pasien</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.alamat"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name={"pasien.pasien_create.tempat_lahir"}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tempat Lahir Pasien</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.tempat_lahir"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={"pasien.pasien_create.tanggal_lahir"}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tanggal Lahir Pasien</FieldLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.tanggal_lahir"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name={"pasien.pasien_create.nomor_hp"}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nomor Handphone Pasien</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.nomor_hp"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={"pasien.pasien_create.email"}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email Pasien</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="pasien.pasien_create.email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            control={control}
            name={"pasien.pasien_create.pekerjaan_public_id"}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel>Pekerjaan</FieldLabel>
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className={"w-full"}
                  >
                    <SelectValue placeholder={currentPekerjaan?.nama ?? ""}>
                      {currentPekerjaan?.nama ?? "Pilih pekerjaan"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.public_id} value={job.public_id}>
                        {job.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="alergi_pasiens"
              control={control}
              render={({ field, fieldState }) => (
                <FieldGroup>
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend variant="label">Alergi</FieldLegend>
                    <FieldDescription>
                      Pilih alergi yang dimiliki pasien.
                    </FieldDescription>

                    <FieldGroup
                      data-slot="checkbox-group"
                      className="grid grid-cols-3 gap-3"
                    >
                      {allergies.map((allergy) => (
                        <Field
                          key={allergy.public_id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Checkbox
                            id={`alergi-${allergy.public_id}`}
                            checked={field.value.some(
                              (a) => a.alergi_public_id === allergy.public_id,
                            )}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [
                                    ...field.value,
                                    { alergi_public_id: allergy.public_id },
                                  ]
                                : field.value.filter(
                                    (a) =>
                                      a.alergi_public_id !== allergy.public_id,
                                  );

                              field.onChange(newValue);
                            }}
                          />

                          <FieldLabel
                            htmlFor={`alergi-${allergy.public_id}`}
                            className="font-normal"
                          >
                            {allergy.nama}
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldGroup>
              )}
            />
            <Controller
              name="pantangan_pasiens"
              control={control}
              render={({ field, fieldState }) => (
                <FieldGroup>
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend variant="label">Pantangan</FieldLegend>
                    <FieldDescription>
                      Pilih pantangan makanan atau kebiasaan pasien.
                    </FieldDescription>

                    <FieldGroup
                      data-slot="checkbox-group"
                      className="grid grid-cols-3 gap-3"
                    >
                      {pantangan.map((item) => (
                        <Field
                          key={item.public_id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Checkbox
                            id={`pantangan-${item.public_id}`}
                            checked={field.value.some(
                              (p) => p.pantangan_public_id === item.public_id,
                            )}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [
                                    ...field.value,
                                    {
                                      pantangan_public_id: item.public_id,
                                    },
                                  ]
                                : field.value.filter(
                                    (p) =>
                                      p.pantangan_public_id !== item.public_id,
                                  );

                              field.onChange(newValue);
                            }}
                          />

                          <FieldLabel
                            htmlFor={`pantangan-${item.public_id}`}
                            className="font-normal"
                          >
                            {item.nama}
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldGroup>
              )}
            />
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
