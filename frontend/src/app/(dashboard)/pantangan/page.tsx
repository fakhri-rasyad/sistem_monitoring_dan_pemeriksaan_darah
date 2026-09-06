"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import { DeletePantangan, getPantangan } from "@/services/pantangan";
import { toPantanganData } from "@/features/submission/utils/pantangan_mapper";
import { PantanganColumns } from "@/features/submission/types/pantangan_data";
import { Spinner } from "@/components/ui/spinner";
import { PantanganData } from "@/services/pasien";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function PantanganiPage() {
  const [pantanganData, setPantanganData] = useState<PantanganData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPantanganId, setSelectedPantanganId] = useState<string | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const pantangan = await getPantangan();
      setPantanganData(pantangan.map(toPantanganData));
    } catch (err) {
      console.error(err);
      setPantanganData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (public_id: string) => {
    setSelectedPantanganId(public_id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPantanganId) return;

    setIsLoading(true);

    try {
      await DeletePantangan(selectedPantanganId);

      setPantanganData((current) =>
        current.filter(
          (pantangan) => pantangan.public_id !== selectedPantanganId,
        ),
      );

      toast.success("Sukses menghapus pantangan");
      setSelectedPantanganId(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus pantangan");
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
        columns={PantanganColumns(handleDelete)}
        data={pantanganData}
        tableName="Daftar Pantangan"
        actionLink={null}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus pantangan?"
        description="Apakah Anda yakin ingin menghapus pantangan ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
