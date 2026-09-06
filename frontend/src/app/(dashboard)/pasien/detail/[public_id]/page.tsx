"use client";

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPasienDetail, PasienDetailResponse } from "@/services/pasien";
import { DeleteKunjungan } from "@/services/kunjungan";

import { Spinner } from "@/components/ui/spinner";
import DataTables from "@/components/layouts/data-table";
import { PasienDetailKunjunganColumns } from "@/features/submission/types/kunjungan_column";
import Info from "@/components/shared/info";
import formatDate from "@/utils/date";
import { SectionCard } from "@/components/shared/section_card";
import { BeanOff, User, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function PasienDetailPage() {
  const params = useParams<{ public_id: string }>();

  const [pasien, setPasien] = useState<PasienDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedKunjunganId, setSelectedKunjunganId] = useState<string | null>(
    null,
  );

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
