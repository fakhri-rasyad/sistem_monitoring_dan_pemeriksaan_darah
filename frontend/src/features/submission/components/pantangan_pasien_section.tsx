import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";
import { PantanganResponse } from "../types/pantangan_response";
import { AddPantangan, getPantangan } from "@/services/pantangan";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export function PantanganSection({ form }: Props) {
  const { control } = form;

  const [pantangan, setPantangan] = useState<PantanganResponse[]>([]);
  const [openPantanagan, setPantanganOpen] = useState(false);
  const [namaPantangan, setNamaPantangan] = useState<string>("");

  const handlePantanganNamaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaPantangan(event.target.value);
  };

  useEffect(() => {
    async function load() {
      const pantangan = await getPantangan();
      setPantangan(pantangan);
    }
    load();
  }, []);

  async function addPantangan() {
    const nama = namaPantangan.trim();

    if (!nama) {
      toast.error("Nama alergi tidak boleh kosong");
      return;
    }

    try {
      const res = await AddPantangan(nama);

      toast.success(res.Message);

      setPantangan((current) => [...current, res.Data]);

      setNamaPantangan("");
      setPantanganOpen(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Terjadi kesalahan saat menambah pantangan",
      );
    }
  }

  return (
    <Controller
      name="pantangan_pasiens"
      control={control}
      render={({ field, fieldState }) => (
        <FieldGroup>
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant="label">Pantangan</FieldLegend>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <FieldDescription>
                Pilih pantangan yang dimiliki pasien.
              </FieldDescription>
              <Dialog open={openPantanagan} onOpenChange={setPantanganOpen}>
                <DialogTrigger
                  render={
                    <Button type="button" variant="outline">
                      <PlusIcon data-icon="inline-start" /> Tambah Pantangan
                    </Button>
                  }
                />

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Tambah Pantangan</DialogTitle>
                  </DialogHeader>

                  <Field>
                    <FieldLabel htmlFor="nama-pantangan">
                      Nama Pantangan
                    </FieldLabel>

                    <Input
                      id="nama-pantangan"
                      value={namaPantangan}
                      onChange={handlePantanganNamaChange}
                      placeholder="Tambahkan nama pantangan di sini"
                    />
                  </Field>

                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button type="button" variant="outline">
                          Batal
                        </Button>
                      }
                    />

                    <Button type="button" onClick={addPantangan}>
                      Simpan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />
            <FieldGroup
              data-slot="checkbox-group"
              className="grid grid-cols-2 lg:grid-cols-3 gap-3"
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
                            (p) => p.pantangan_public_id !== item.public_id,
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

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldGroup>
      )}
    />
  );
}
