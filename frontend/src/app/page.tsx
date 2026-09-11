"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  PasienColumns,
  PasienData,
} from "@/features/dashboard/types/pasien_data_column";
import { PasienMapper } from "@/features/dashboard/utils/pasien_mapper";
import { DeletePasien, getPasien } from "@/services/pasien";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function DashboardPage() {
  const [pasienData, setPasienData] = useState<PasienData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPasienUID, setSelectedPasienUID] = useState<string | null>(
    null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const pasien = await getPasien();
      setPasienData(pasien.map(PasienMapper));
    } catch (err) {
      console.error(err);
      setPasienData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (public_id: string) => {
    setSelectedPasienUID(public_id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPasienUID) return;

    setIsLoading(true);

    try {
      await DeletePasien(selectedPasienUID);

      setPasienData((current) =>
        current.filter((pasien) => pasien.public_id !== selectedPasienUID),
      );

      toast.success("Sukses menghapus pasien");

      setSelectedPasienUID(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus pasien");
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
        columns={PasienColumns(handleDelete)}
        data={pasienData}
        tableName="Pasien"
        actionLink={"/submission"}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus pasien?"
        description="Apakah Anda yakin ingin menghapus pasien ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
