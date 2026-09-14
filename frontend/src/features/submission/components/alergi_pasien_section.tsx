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
import { AlergiResponse } from "../types/alergi_response";
import { Button } from "@/components/ui/button";
import { getRiwayatPenyakit } from "@/services/riwayat_penyakit";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { AddAlergi, getAlergi } from "@/services/alergi";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export function AlergiPasienSection({ form }: Props) {
  const { control } = form;

  const [allergies, setAllergies] = useState<AlergiResponse[]>([]);
  const [openALergi, setAlergiOpen] = useState(false);
  const [namaAlergi, setNamaAlergi] = useState<string>("");

  const handleAlergiNamaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaAlergi(event.target.value);
  };

  useEffect(() => {
    async function load() {
      const alergi = await getAlergi();
      setAllergies(alergi);
    }

    load();
  }, []);

  async function addAlergi() {
    const nama = namaAlergi.trim();

    if (!nama) {
      toast.error("Nama alergi tidak boleh kosong");
      return;
    }

    try {
      const res = await AddAlergi(nama);

      toast.success(res.Message);

      setAllergies((current) => [...current, res.Data]);

      setNamaAlergi("");
      setAlergiOpen(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Terjadi kesalahan saat menambah alergi",
      );
    }
  }

  return (
    <Controller
      name="alergi_pasiens"
      control={control}
      render={({ field, fieldState }) => (
        <FieldGroup>
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant="label">Alergi</FieldLegend>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <FieldDescription>
                Pilih alergi yang dimiliki pasien.
              </FieldDescription>
              <Dialog open={openALergi} onOpenChange={setAlergiOpen}>
                <DialogTrigger
                  render={
                    <Button type="button" variant="outline">
                      <PlusIcon data-icon="inline-start" /> Tambah Alergi
                    </Button>
                  }
                />

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Tambah Alergi</DialogTitle>
                  </DialogHeader>

                  <Field>
                    <FieldLabel htmlFor="nama-alergi">Nama Alergi</FieldLabel>

                    <Input
                      id="nama-alergi"
                      value={namaAlergi}
                      onChange={handleAlergiNamaChange}
                      placeholder="Tambahkan nama alergi di sini"
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

                    <Button type="button" onClick={addAlergi}>
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
                            (a) => a.alergi_public_id !== allergy.public_id,
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

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldGroup>
      )}
    />
  );
}
