"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KunjunganSectionProps {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function KunjunganSection({ form }: KunjunganSectionProps) {
  const { control, register } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Kunjungan</CardTitle>
        <CardDescription>Bagian pengisian data pada kunjungan</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name="kunjungan.tanggal"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Tanggal Kunjungan</FieldLabel>
                <Input
                  {...field}
                  type="datetime-local"
                  aria-invalid={fieldState.invalid}
                  id="kunjungan.tanggal"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="kunjungan.tensi_sistol"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Tensi Sistol</FieldLabel>
                  <Input
                    {...register("kunjungan.tensi_sistol", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="kunjungan.tensi_sistol"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="kunjungan.tensi_diastol"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Tensi Diastol</FieldLabel>
                  <Input
                    {...register("kunjungan.tensi_diastol", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="kunjungan.tensi_diastol"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
