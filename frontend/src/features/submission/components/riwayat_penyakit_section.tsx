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
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  AddRiwayatPenyakit,
  getRiwayatPenyakit,
} from "@/services/riwayat_penyakit";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";
import { useEffect, useState } from "react";
import { RiwayatPenyakitResponse } from "../types/riwayat_penyakit_response";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export function RiwayatPenyakitSection({ form }: Props) {
  const { control } = form;

  const [riwayatPenyakit, setRiwayatPenyakit] = useState<
    RiwayatPenyakitResponse[]
  >([]);
  const [openRiwayatPenyakit, setRiwayatPenyakitOpen] =
    useState<boolean>(false);
  const [namaRiwayatPenyakit, setNamaRiwayatPenyakit] = useState<string>("");

  const handleRiwayatPenyakitChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaRiwayatPenyakit(event.target.value);
  };

  useEffect(() => {
    async function load() {
      const riwayatPenyakit = await getRiwayatPenyakit();
      setRiwayatPenyakit(riwayatPenyakit);
    }
    load();
  }, []);

  async function addRiwayatPenyakit() {
    const nama = namaRiwayatPenyakit.trim();

    if (!nama) {
      toast.error("Nama riwayat penyakit tidak boleh kosong");
      return;
    }

    try {
      const res = await AddRiwayatPenyakit(nama);

      toast.success(res.Message);

      setRiwayatPenyakit((current) => [...current, res.Data]);

      setNamaRiwayatPenyakit("");
      setRiwayatPenyakitOpen(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Terjadi kesalahan saat menambah riwayat penyakit",
      );
    }
  }

  return (
    <Controller
      name="riwayat_penyakit_pasiens"
      control={control}
      render={({ field, fieldState }) => (
        <FieldGroup>
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant="label">Riwayat Penyakit</FieldLegend>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <FieldDescription>
                Pilih riwayat penyakit yang dimiliki pasien.
              </FieldDescription>
              <Dialog
                open={openRiwayatPenyakit}
                onOpenChange={setRiwayatPenyakitOpen}
              >
                <DialogTrigger
                  render={
                    <Button type="button" variant="outline">
                      <PlusIcon data-icon="inline-start" /> Tambah Riwayat
                      Penyakit
                    </Button>
                  }
                />

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Tambah Riwayat Penyakit</DialogTitle>
                  </DialogHeader>

                  <Field>
                    <FieldLabel htmlFor="nama-riwayat-pekerjaan">
                      Nama Riwayat Penyakit
                    </FieldLabel>

                    <Input
                      id="nama-riwayat-penyakit"
                      value={namaRiwayatPenyakit}
                      onChange={handleRiwayatPenyakitChange}
                      placeholder="Tambahkan nama riwayat penyakit di sini"
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

                    <Button type="button" onClick={addRiwayatPenyakit}>
                      Simpan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />
            <FieldGroup
              data-slot="checkbox-group"
              className="grid grid-cols-3 gap-3"
            >
              {riwayatPenyakit.map((item) => (
                <Field
                  key={item.public_id}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={`riwayat_penyakit-${item.public_id}`}
                    checked={field.value.some(
                      (p) => p.riwayat_penyakit_public_id === item.public_id,
                    )}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [
                            ...field.value,
                            {
                              riwayat_penyakit_public_id: item.public_id,
                            },
                          ]
                        : field.value.filter(
                            (p) =>
                              p.riwayat_penyakit_public_id !== item.public_id,
                          );

                      field.onChange(newValue);
                    }}
                  />

                  <FieldLabel
                    htmlFor={`riwayat_penyakit-${item.public_id}`}
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
