"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  AlergiColumns,
  AlergiData,
} from "@/features/submission/types/alergi_data";
import { getAlergi } from "@/services/alergi";
import { toAlergiData } from "@/features/submission/utils/alergi_mapper";
import { PpdhColumns, PpdhData } from "@/features/submission/types/ppdh_data";
import { DeletePPDH, getPPDH } from "@/services/ppdh";
import { toPpdhData } from "@/features/submission/utils/ppdh_mapper";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/shared/delete_confirmation_dialog";

export default function PpdhPage() {
  const [ppdhData, setPpdhData] = useState<PpdhData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPpdh, setSelectedPpdh] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      const ppdh = await getPPDH();
      setPpdhData(ppdh.map(toPpdhData));
    } catch (err) {
      console.error(err);
      setPpdhData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleConfirmDelete = async () => {
    if (!selectedPpdh) return;

    setIsLoading(true);

    try {
      await DeletePPDH(selectedPpdh);

      setPpdhData((current) =>
        current.filter((pantangan) => pantangan.public_id !== selectedPpdh),
      );

      toast.success("Sukses menghapus parameter");
      setSelectedPpdh(null);
      setDeleteDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus parameter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (public_id: string) => {
    setDeleteDialogOpen(true);
    setSelectedPpdh(public_id);
  };

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
        columns={PpdhColumns(handleDelete)}
        data={ppdhData}
        tableName="Parameter pemeriksaan darah"
        actionLink={null}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus parameter?"
        description="Apakah Anda yakin ingin menghapus parameter ini? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}
