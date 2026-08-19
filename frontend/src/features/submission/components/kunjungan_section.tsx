"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LucideCalendar } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function KunjunganSection() {
  const { control, register } = useFormContext();

  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Kunjungan</CardTitle>
        <CardDescription>Bagian pengisian data pada kunjungan</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Controller
              name={"kunjungan.tanggal"}
              control={control}
              render={({ field, fieldState }) => {
                const today = new Date();
                today.setHours(23, 59, 59, 999);

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="kunjungan.tanggal">
                      Tanggal Kunjungan
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
                              : "Pilih tanggal kunjungan"}
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

            <Controller
              control={control}
              name="kunjungan.tensi"
              render={({ fieldState }) => (
                <Field>
                  <FieldLabel>Tensi (00/00)</FieldLabel>
                  <Input
                    {...register("kunjungan.tensi")}
                    aria-invalid={fieldState.invalid}
                    id="kunjungan.tensi"
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
