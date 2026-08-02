"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "module";
import { Controller, UseFormReturn } from "react-hook-form";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";
import { Textarea } from "@/components/ui/textarea";

interface PemeriksaanSectionProps {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function PemeriksaanSection({ form }: PemeriksaanSectionProps) {
  const { control, register } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Pemeriksaan</CardTitle>
        <CardDescription>
          Bagian pengisian data hasil pemeriksaan pasien
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-4 gap-4">
            <Controller
              control={control}
              name="pemeriksaan.subjective"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Hasil Pemeriksaan Subjektif</FieldLabel>
                  <Textarea
                    {...register("pemeriksaan.subjective")}
                    aria-invalid={fieldState.invalid}
                    id="pemeriksaan.subjective"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="pemeriksaan.objective"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Hasil Pemeriksaan Objektif</FieldLabel>
                  <Textarea
                    {...register("pemeriksaan.objective")}
                    aria-invalid={fieldState.invalid}
                    id="pemeriksaan.objective"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="pemeriksaan.evaluasi"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Evaluasi pemeriksaan</FieldLabel>
                  <Textarea
                    {...register("pemeriksaan.evaluasi")}
                    aria-invalid={fieldState.invalid}
                    id="pemeriksaan.evaluasi"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="pemeriksaan.planning_terapi"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Planning pemeriksaan</FieldLabel>
                  <Textarea
                    {...register("pemeriksaan.planning_terapi")}
                    aria-invalid={fieldState.invalid}
                    id="pemeriksaan.planning_terapi"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name={"pemeriksaan.diperiksa_at"}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tanggal Pemeriksaan</FieldLabel>
                <Input
                  type="datetime-local"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="pemeriksaan.diperiksa_at"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
