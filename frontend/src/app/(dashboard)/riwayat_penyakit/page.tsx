"use client";

import DataTables from "@/components/layouts/data-table";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";
import { Spinner } from "@/components/ui/spinner";
import { RiwayatPenyakitColumns } from "@/features/submission/types/riwayat_penyakit_data";
import { RiwayatPenyakitResponse } from "@/features/submission/types/riwayat_penyakit_response";
import {
  DeleteRiwayatPenyakit,
  getRiwayatPenyakit,
} from "@/services/riwayat_penyakit";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RiwayatPenyakitPage() {
  const [riwayatPenyakitData, setRiwayatPenyakitData] = useState<
    RiwayatPenyakitResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRiwayatPenyakitId, setSelectedRiwayatPenyakitId] = useState<
    string | null
  >(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const riwayatPenyakit = await getRiwayatPenyakit();
      setRiwayatPenyakitData(riwayatPenyakit);
    } catch (err) {
      console.error(err);
      setRiwayatPenyakitData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (public_id: string) => {
    setSelectedRiwayatPenyakitId(public_id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRiwayatPenyakitId) return;

    setIsLoading(true);

    try {
      await DeleteRiwayatPenyakit(selectedRiwayatPenyakitId);

      setRiwayatPenyakitData((current) =>
        current.filter(
          (riwayat_penyakit) =>
            riwayat_penyakit.public_id !== selectedRiwayatPenyakitId,
        ),
      );

      toast.success("Sukses menghapus riwayat penyakit");

      setSelectedRiwayatPenyakitId(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus riwayat penyakit");
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
        columns={RiwayatPenyakitColumns(handleDelete)}
        data={riwayatPenyakitData}
        tableName="Daftar riwayat penyakit"
        actionLink={null}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus riwayat penyakit?"
        description="Apakah Anda yakin ingin menghapus riwayat penyakit ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
