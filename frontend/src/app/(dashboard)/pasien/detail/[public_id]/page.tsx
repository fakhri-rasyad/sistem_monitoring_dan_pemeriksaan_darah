"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
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

export default function PasienDetailPage() {
  const params = useParams<{ public_id: string }>();

  const [pasien, setPasien] = useState<PasienDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const [selectedKunjunganId, setSelectedKunjunganId] = useState<string | null>(
    null,
  );

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasienUpdateValue>({
    resolver: zodResolver(PasienUpdate),
    defaultValues: {
      public_id: params.public_id,
      alamat: "",
    },
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.public_id]);

  const handleOpenUpdateDialog = () => {
    if (!pasien) return;

    reset({
      public_id: params.public_id,
      alamat: pasien.alamat ?? "",
    });

    setUpdateDialogOpen(true);
  };

  const handleUpdatePasien = async (data: PasienUpdateValue) => {
    setUpdateLoading(true);

    try {
      await updatePasien(data);

      setPasien((current) => {
        if (!current) return current;

        return {
          ...current,
          alamat: data.alamat,
        };
      });

      toast.success("Sukses memperbarui data pasien");
      setUpdateDialogOpen(false);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
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
            <Button variant="outline" onClick={handleOpenUpdateDialog}>
              <Pencil />
              Edit
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Info label="Nama" value={pasien.nama} />

          <Info label="Nomor HP" value={pasien.nomor_hp} />

          <Info label="Email" value={pasien.email} />

          <Info label="Pekerjaan" value={pasien.pekerjaan?.nama} />

          <Info label="Tempat Lahir" value={pasien.tempat_lahir} />

          <Info
            label="Tanggal Lahir"
            value={formatDate(pasien.tanggal_lahir)}
          />

          <Info label="Alamat" value={pasien.alamat} />
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

      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Pasien</DialogTitle>

            <DialogDescription>
              Perbarui informasi pasien yang dapat diubah.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleUpdatePasien, (errors) => {
              console.log("Validation errors:", errors);
            })}
            className="space-y-4"
          >
            <Field>
              <FieldLabel htmlFor="alamat">Alamat</FieldLabel>

              <Input
                id="alamat"
                placeholder="Masukkan alamat pasien"
                {...register("alamat")}
                aria-invalid={!!errors.alamat}
              />

              {errors.alamat && <FieldError errors={[errors.alamat]} />}
            </Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setUpdateDialogOpen(false)}
                disabled={updateLoading}
              >
                Batal
              </Button>

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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
