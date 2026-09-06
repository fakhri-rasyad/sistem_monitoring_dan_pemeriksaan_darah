"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  AlergiColumns,
  AlergiData,
} from "@/features/submission/types/alergi_data";
import { DeleteAlergi, getAlergi } from "@/services/alergi";
import { toAlergiData } from "@/features/submission/utils/alergi_mapper";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function AlergiPage() {
  const [alergiData, setAlergiData] = useState<AlergiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedAlergiId, setSelectedAlergiId] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const alergi = await getAlergi();
      setAlergiData(alergi.map(toAlergiData));
    } catch (err) {
      console.error(err);
      setAlergiData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (public_id: string) => {
    setSelectedAlergiId(public_id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAlergiId) return;

    setIsLoading(true);

    try {
      await DeleteAlergi(selectedAlergiId);

      setAlergiData((current) =>
        current.filter((alergi) => alergi.public_id !== selectedAlergiId),
      );

      toast.success("Sukses menghapus alergi");

      setSelectedAlergiId(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus alergi");
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
        columns={AlergiColumns(handleDelete)}
        data={alergiData}
        tableName="Daftar Alergi"
        actionLink={null}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus alergi?"
        description="Apakah Anda yakin ingin menghapus alergi ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
