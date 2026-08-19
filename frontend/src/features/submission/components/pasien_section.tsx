"use client";

import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { AddPekerjaan, getPekerjaan } from "@/services/pekerjaan";
import { AddAlergi, getAlergi } from "@/services/alergi";
import { AddPantangan, getPantangan } from "@/services/pantangan";

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
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";
import { toPekerjaanData } from "../utils/pekerjaan_mapper";
import { toAlergiData } from "../utils/alergi_mapper";
import { toPantanganData } from "../utils/pantangan_mapper";
import { PekerjaanResponse } from "../types/pekerjaan_response";
import { AlergiResponse } from "../types/alergi_response";
import { PantanganResponse } from "../types/pantangan_response";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LucideCalendar, PlusIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function PatientSection({ form }: Props) {
  const { watch, control } = form;

  const [openTanggal, setTanggalOpen] = useState(false);

  const [jobs, setJobs] = useState<PekerjaanResponse[]>([]);
  const [openPekerjaan, setOpenPekerjaan] = useState(false);
  const [namaPekerjaan, setNamaPekerjaan] = useState<string>("");

  const [allergies, setAllergies] = useState<AlergiResponse[]>([]);
  const [openALergi, setAlergiOpen] = useState(false);
  const [namaAlergi, setNamaAlergi] = useState<string>("");

  const [pantangan, setPantangan] = useState<PantanganResponse[]>([]);
  const [openPantanagan, setPantanganOpen] = useState(false);
  const [namaPantangan, setNamaPantangan] = useState<string>("");

  const handlePekerjaanNamaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaPekerjaan(event.target.value);
  };

  const handleAlergiNamaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaAlergi(event.target.value);
  };

  const handlePantanganNamaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaPantangan(event.target.value);
  };

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

  async function addPekerjaan() {
    const nama = namaPekerjaan.trim();

    if (!nama) {
      toast.error("Nama pekerjaan tidak boleh kosong");
      return;
    }

    try {
      const res = await AddPekerjaan(nama);

      toast.success(res.Message);

      setJobs((current) => [...current, res.Data]);

      form.setValue(
        "pasien.pasien_create.pekerjaan_public_id",
        res.Data.public_id,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );

      setNamaPekerjaan("");
      setOpenPekerjaan(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Terjadi kesalahan saat menambah pekerjaan",
      );
    }
  }

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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
            {/* <Controller
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
            /> */}
            <Controller
              name={"pasien.pasien_create.tanggal_lahir"}
              control={control}
              render={({ field, fieldState }) => {
                const today = new Date();
                today.setHours(23, 59, 59, 999);

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="ayah.create.tanggal_lahir">
                      Tanggal Lahir
                    </FieldLabel>

                    <Popover open={openTanggal} onOpenChange={setTanggalOpen}>
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
                              : "Pilih tanggal lahir"}
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
                            setTanggalOpen(false);
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
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          <div>
            <Controller
              control={control}
              name="pasien.pasien_create.pekerjaan_public_id"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Pekerjaan</FieldLabel>
                  <FieldContent>
                    <div className="grid grid-cols-4 gap-4 lg:grid-cols-8">
                      <div className="col-span-3 lg:col-span-7">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            className="w-full"
                          >
                            <SelectValue
                              placeholder={currentPekerjaan?.nama ?? ""}
                            >
                              {currentPekerjaan?.nama ?? "Pilih pekerjaan"}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {jobs.map((job) => (
                              <SelectItem
                                key={job.public_id}
                                value={job.public_id}
                              >
                                {job.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 lg:col-span-1">
                        <Dialog
                          open={openPekerjaan}
                          onOpenChange={setOpenPekerjaan}
                        >
                          <DialogTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                              >
                                <PlusIcon />
                              </Button>
                            }
                          />

                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Tambah Pekerjaan</DialogTitle>
                            </DialogHeader>

                            <Field>
                              <FieldLabel htmlFor="nama-pekerjaan">
                                Nama Pekerjaan
                              </FieldLabel>

                              <Input
                                id="nama-pekerjaan"
                                value={namaPekerjaan}
                                onChange={handlePekerjaanNamaChange}
                                placeholder="Tambahkan nama pekerjaan di sini"
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

                              <Button type="button" onClick={addPekerjaan}>
                                Simpan
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </FieldContent>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                              <PlusIcon data-icon="inline-start" /> Tambah
                              Alergi
                            </Button>
                          }
                        />

                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Tambah Alergi</DialogTitle>
                          </DialogHeader>

                          <Field>
                            <FieldLabel htmlFor="nama-alergi">
                              Nama Alergi
                            </FieldLabel>

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
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <FieldDescription>
                        Pilih pantangan yang dimiliki pasien.
                      </FieldDescription>
                      <Dialog
                        open={openPantanagan}
                        onOpenChange={setPantanganOpen}
                      >
                        <DialogTrigger
                          render={
                            <Button type="button" variant="outline">
                              <PlusIcon data-icon="inline-start" /> Tambah
                              Pantangan
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
