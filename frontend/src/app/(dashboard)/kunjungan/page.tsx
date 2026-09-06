"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import { Spinner } from "@/components/ui/spinner";
import { DeleteKunjungan, getKunjungan } from "@/services/kunjungan";
import { KunjunganData } from "@/services/pasien";
import { KunjunganColumns } from "@/features/submission/types/kunjungan_column";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function KunjunganPage() {
  const [kunjunganData, setKunjunganData] = useState<KunjunganData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKunjunganId, setSelectedKunjunganId] = useState<string | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const kunjungan = await getKunjungan();
      setKunjunganData(kunjungan.Data);
    } catch (err) {
      console.error(err);
      setKunjunganData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (public_id: string) => {
    setSelectedKunjunganId(public_id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedKunjunganId) return;

    setIsLoading(true);

    try {
      await DeleteKunjungan(selectedKunjunganId);

      setKunjunganData((current) =>
        current.filter(
          (kunjungan) => kunjungan.public_id !== selectedKunjunganId,
        ),
      );

      toast.success("Sukses menghapus kunjungan");
      setSelectedKunjunganId(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus kunjungan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-24 lg:py-10">
      <DataTables
        columns={KunjunganColumns(handleDelete)}
        data={kunjunganData}
        tableName="Daftar Kunjungan"
        actionLink={null}
      />

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
