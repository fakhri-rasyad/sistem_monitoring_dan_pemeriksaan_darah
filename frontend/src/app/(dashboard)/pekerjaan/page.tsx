"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import { DeletePekerjaan, getPekerjaan } from "@/services/pekerjaan";
import {
  PekerjaanColumns,
  PekerjaanData,
} from "@/features/submission/types/pekerjaan_data";
import { toPekerjaanData } from "@/features/submission/utils/pekerjaan_mapper";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function PekerjaanPage() {
  const [pekerjaanData, setPekerjanData] = useState<PekerjaanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPekerjaanID, setSelectedPekerjaanID] = useState<string | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const pekerjaan = await getPekerjaan();
      setPekerjanData(pekerjaan.map(toPekerjaanData));
    } catch (err) {
      console.error(err);
      setPekerjanData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedPekerjaanID) return;
    setIsLoading(true);
    try {
      await DeletePekerjaan(selectedPekerjaanID);
      setPekerjanData(
        pekerjaanData.filter(
          (pekerjaan) => pekerjaan.public_id !== selectedPekerjaanID,
        ),
      );
      toast.success("Sukses menghapus pekerjaan");

      setIsLoading(false);
      setSelectedPekerjaanID(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      toast.error("Gagal menghapus pekerjaan");

      setIsLoading(false);
    }
  };

  const handleDelete = (public_id: string) => {
    setSelectedPekerjaanID(public_id);
    setDeleteDialogOpen(true);
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
        columns={PekerjaanColumns(handleDelete)}
        data={pekerjaanData}
        tableName="Daftar Pekerjaan"
        actionLink={null}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus pekerjaan?"
        description="Apakah Anda yakin ingin menghapus pekerjaan ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
