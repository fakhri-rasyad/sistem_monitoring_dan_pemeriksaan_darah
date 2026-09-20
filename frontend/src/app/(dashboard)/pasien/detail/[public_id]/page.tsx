"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  getPasienDetail,
  PasienDetailResponse,
  updatePasien,
} from "@/services/pasien";
import { DeleteKunjungan } from "@/services/kunjungan";

import { Spinner } from "@/components/ui/spinner";
import DataTables from "@/components/layouts/data-table";
import { PasienDetailKunjunganColumns } from "@/features/submission/types/kunjungan_column";
import Info from "@/components/shared/info";
import formatDate from "@/utils/date";
import { SectionCard } from "@/components/shared/section_card";

import {
  BeanOff,
  ClipboardClock,
  User,
  UtensilsCrossed,
  Pencil,
  LucideCalendar,
} from "lucide-react";

import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";
import { DownloadUserDetail } from "@/services/export";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import {
  PasienUpdate,
  PasienUpdateValue,
} from "@/features/submission/schema/pasien_update_schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function PasienDetailPage() {
  const params = useParams<{ public_id: string }>();

  const [pasien, setPasien] = useState<PasienDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedKunjunganId, setSelectedKunjunganId] = useState<string | null>(
    null,
  );

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [pasienEditStatus, setPasienEditStatus] = useState(false);
  const [openTanggal, setTanggalOpen] = useState(false);

  const defaultValue = {
    public_id: params.public_id,
    nama: "",
    alamat: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nomor_hp: "",
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<PasienUpdateValue>({
    resolver: zodResolver(PasienUpdate),
    defaultValues: defaultValue,
  });

  const handleDelete = (publicId: string) => {
    setSelectedKunjunganId(publicId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedKunjunganId) return;

    try {
      await DeleteKunjungan(selectedKunjunganId);

      setPasien((current) => {
        if (!current) return current;

        return {
          ...current,
          kunjungan: current.kunjungan.filter(
            (kunjungan) => kunjungan.public_id !== selectedKunjunganId,
          ),
        };
      });

      toast.success("Sukses menghapus kunjungan");
      setSelectedKunjunganId(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus kunjungan");
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await getPasienDetail(params.public_id);

        setPasien(data);

        reset({
          public_id: data.public_id,
          nama: data.nama ?? "",
          alamat: data.alamat ?? "",
          tempat_lahir: data.tempat_lahir ?? "",
          tanggal_lahir: data.tanggal_lahir ?? "",
          nomor_hp: data.nomor_hp ?? "",
          email: data.email ?? "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.public_id, reset]);

  const handleCancelEdit = () => {
    if (!pasien) return;

    reset({
      public_id: pasien.public_id,
      nama: pasien.nama ?? "",
      alamat: pasien.alamat ?? "",
      tempat_lahir: pasien.tempat_lahir ?? "",
      tanggal_lahir: pasien.tanggal_lahir ?? "",
      nomor_hp: pasien.nomor_hp ?? "",
      email: pasien.email ?? "",
    });

    setPasienEditStatus(false);
  };

  const handleUpdatePasien = async (data: PasienUpdateValue) => {
    console.log("SUBMIT DATA:", data);

    setUpdateLoading(true);

    try {
      await updatePasien(data);

      setPasien((current) => {
        if (!current) return current;

        return {
          ...current,
          public_id: data.public_id,
          nama: data.nama ?? current.nama,
          alamat: data.alamat ?? current.alamat,
          tempat_lahir: data.tempat_lahir ?? current.tempat_lahir,
          tanggal_lahir: data.tanggal_lahir ?? current.tanggal_lahir,
          nomor_hp: data.nomor_hp ?? current.nomor_hp,
          email: data.email ?? current.email,
          pekerjaan: current.pekerjaan,
        };
      });

      toast.success("Sukses memperbarui data pasien");
      setPasienEditStatus(false);
    } catch (error) {
      console.error("UPDATE PASIEN ERROR:", error);
      toast.error("Gagal memperbarui data pasien");
    } finally {
      setUpdateLoading(false);
    }
  };
  const export_user_data = async () => {
    setDownloadLoading(true);

    try {
      await DownloadUserDetail(params.public_id);
      toast.success("Sukses mendownload data user");
    } catch {
      toast.error("Gagal mendownload data user");
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!pasien) {
    return <div className="p-6">Data pasien tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <SectionCard
        id="data_pasien"
        title="Data Pasien"
        description="Detail pasien"
        icon={User}
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setPasienEditStatus(!pasienEditStatus)}
            >
              <Pencil />
              {pasienEditStatus ? "Sedang mengedit" : "Edit"}
            </Button>

            <Button onClick={export_user_data} disabled={downloadLoading}>
              {downloadLoading ? (
                <>
                  <Spinner />
                  Mendownload...
                </>
              ) : (
                "Download Data Pasien"
              )}
            </Button>
          </div>
        }
      >
        <div className="gap-4">
          <form
            onSubmit={handleSubmit(handleUpdatePasien, (errors) => {
              console.log("Validation errors:", errors);
            })}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name={"nama"}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nama Pasien</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="nama"
                      readOnly={!pasienEditStatus}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={"alamat"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Alamat Pasien</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="alamat"
                      readOnly={!pasienEditStatus}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Controller
                name={"tempat_lahir"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Tempat Lahir Pasien</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="tempat_lahir"
                      readOnly={!pasienEditStatus}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={"tanggal_lahir"}
                control={control}
                render={({ field, fieldState }) => {
                  const today = new Date();
                  today.setHours(23, 59, 59, 999);

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="tanggal_lahir">
                        Tanggal Lahir
                      </FieldLabel>

                      <Popover open={openTanggal} onOpenChange={setTanggalOpen}>
                        <PopoverTrigger
                          disabled={!pasienEditStatus}
                          render={
                            <Button
                              variant="outline"
                              id="tanggal_lahir"
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
                name={"nomor_hp"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nomor Handphone Pasien</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="nomor_hp"
                      readOnly={!pasienEditStatus}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={"email"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email Pasien</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="email"
                      readOnly={!pasienEditStatus}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Info label="Pekerjaan" value={pasien.pekerjaan?.nama} />
            {pasienEditStatus && (
              <div className="flex flex-row-reverse gap-2">
                <Button type="submit" disabled={updateLoading}>
                  {updateLoading ? (
                    <>
                      <Spinner />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SectionCard
          id="alergi"
          title="Alergi"
          description="Detail alergi pasien"
          icon={BeanOff}
        >
          {pasien.alergi_pasien.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada alergi.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pasien.alergi_pasien.map((item) => (
                <div
                  key={item.public_id}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {item.alergi.nama}
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          id="pantangan"
          title="Pantangan"
          description="Detail pantangan pasien"
          icon={UtensilsCrossed}
        >
          {pasien.pantangan_pasien.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tidak ada pantangan.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pasien.pantangan_pasien.map((item) => (
                <div
                  key={item.public_id}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {item.pantangan.nama}
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          id="riwayat_penyakit"
          title="Riwayat Penyakit"
          description="Detail riwayat penyakit pasien"
          icon={ClipboardClock}
        >
          {pasien.riwayat_penyakit_pasien.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tidak ada riwayat penyakit.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pasien.riwayat_penyakit_pasien.map((item) => (
                <div
                  key={item.public_id}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {item.riwayat_penyakit.nama}
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="container mx-auto">
        <DataTables
          columns={PasienDetailKunjunganColumns(handleDelete)}
          data={pasien.kunjungan}
          tableName="Daftar Kunjungan"
          actionLink={`/kunjungan/create/${params.public_id}`}
        />
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus kunjungan?"
        description="Apakah Anda yakin ingin menghapus kunjungan ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
