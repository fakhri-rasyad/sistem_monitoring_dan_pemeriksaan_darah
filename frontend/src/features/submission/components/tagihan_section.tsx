"use client";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { Banknote, CreditCard, QrCode, Receipt } from "lucide-react";
import { SectionCard } from "@/components/shared/section_card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MetodePembayaran } from "@/enum/metode_pembayaran";

export default function TagihanSection() {
  const { control, register, watch } = useFormContext();

  const biayaKonsultasiList = [150000, 100000, 50000];

  const biayaKonsultasi = watch("tagihan.biaya_konsultasi") ?? 0;
  const biayaAlat = watch("tagihan.biaya_alat") ?? 0;

  const total = biayaKonsultasi + biayaAlat;

  const metode_pembayaran = [
    {
      nama: MetodePembayaran.Cash,
      icon: Banknote,
    },
    {
      nama: MetodePembayaran.Qris,
      icon: QrCode,
    },
    {
      nama: MetodePembayaran.Transfer,
      icon: CreditCard,
    },
  ];

  return (
    <SectionCard
      id="tagihan"
      title="Tagihan"
      description="Bagian pengisian tagihan pemeriksaan pasien"
      icon={Receipt}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Controller
            control={control}
            name="tagihan.biaya_konsultasi"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Biaya konsultasi</FieldLabel>
                {/* <Textarea
                  {...register("tagihan.biaya_konsultasi", {
                    valueAsNumber: true,
                  })}
                  aria-invalid={fieldState.invalid}
                  id="tagihan.biaya_konsultasi"
                /> */}
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Pilih biaya">
                      {`Rp ${Number(field.value ?? 0).toLocaleString("id-ID")}`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {biayaKonsultasiList.map((item) => (
                      <SelectItem key={item} value={String(item)}>
                        Rp {item.toLocaleString("id-ID")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="tagihan.biaya_alat"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Biaya alat</FieldLabel>
                <Input
                  type="text"
                  value={`Rp ${Number(field.value ?? 0).toLocaleString("id-ID")}`}
                  readOnly
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Field>
            <FieldLabel>Total Biaya</FieldLabel>
            <FieldContent>
              <Input value={`Rp ${total.toLocaleString("id-ID")}`} readOnly />
            </FieldContent>
          </Field>
          <Controller
            name="tagihan.metode_pembayaran"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Metode Pembayaran</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Pilih metode">
                        {field.value}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {metode_pembayaran.map((metode) => (
                        <SelectItem key={metode.nama} value={metode.nama}>
                          <div className="flex items-center">
                            <metode.icon className="mr-2 h-4 w-4" />
                            {metode.nama}
                          </div>
                        </SelectItem>
                      ))}
                      {/* {Object.values(MetodePembayaran).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </SectionCard>
  );
}
