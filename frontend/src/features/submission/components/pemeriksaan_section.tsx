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
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LucideCalendar } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function PemeriksaanSection() {
  const { control, register } = useFormContext();
  const [open, setOpen] = useState(false);

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            render={({ field, fieldState }) => {
              const today = new Date();
              today.setHours(23, 59, 59, 999);

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pemeriksaan.diperiksa_at">
                    Tanggal Pemeriksaan
                  </FieldLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="ayah.create.tanggal_lahir"
                          className="w-full justify-start"
                          aria-invalid={fieldState.invalid}
                        >
                          <LucideCalendar data-icon="inline-start" />
                          {field.value
                            ? new Date(field.value).toLocaleDateString(
                                "id-ID",
                                {
                                  timeZone: "Asia/Makassar",
                                },
                              )
                            : "Pilih tanggal pemeriksaan"}
                        </Button>
                      }
                    />

                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (!date) return;

                          const isoDate = new Date(
                            Date.UTC(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                            ),
                          ).toISOString();

                          field.onChange(isoDate);
                          setOpen(false);
                        }}
                        disabled={[
                          {
                            before: new Date(1920, 0, 1),
                          },
                          {
                            after: today,
                          },
                        ]}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          {/* <Controller
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
          /> */}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
