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
  FieldLabel,
  Field,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, UseFormReturn } from "react-hook-form";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";

interface KomposisiSectionProp {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function KomposisiTubuhSection({ form }: KomposisiSectionProp) {
  const { control, register, setValue, watch } = form;

  const beratBadan = watch("komposisi_tubuh.berat_badan");
  const tinggiBadan = watch("komposisi_tubuh.tinggi_badan");

  const indeks = beratBadan / ((tinggiBadan / 100) * (tinggiBadan / 100));

  setValue(
    "komposisi_tubuh.indeks_massa_tubuh",
    Math.round(indeks * 100) / 100,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Komposisi Tubuh Pasien</CardTitle>
        <CardDescription>
          Bagian pengisian data komposisi tubuh pasien pada kunjungan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4">
            <Controller
              control={control}
              name="komposisi_tubuh.berat_badan"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Berat Badan (Kg)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.berat_badan", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.berat_badan"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="komposisi_tubuh.tinggi_badan"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Tinggi Badan (cm)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.tinggi_badan", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.tinggi_badan"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="komposisi_tubuh.indeks_massa_tubuh"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>BMI (Kg/m²)</FieldLabel>
                  <Input
                    step="0.01"
                    {...register("komposisi_tubuh.indeks_massa_tubuh", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.indeks_massa_tubuh"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Controller
              control={control}
              name="komposisi_tubuh.air_tubuh"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Air Tubuh (mL)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.air_tubuh", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.air_tubuh"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="komposisi_tubuh.massa_otot"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Massa Otot (Kg)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.massa_otot", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.massa_otot"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="komposisi_tubuh.massa_lemak"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Massa Lemak (Kg)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.massa_lemak", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.massa_lemak"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="komposisi_tubuh.massa_tulang"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Massa Tulang (Kg)</FieldLabel>
                  <Input
                    {...register("komposisi_tubuh.massa_tulang", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    id="komposisi_tubuh.massa_tulang"
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
