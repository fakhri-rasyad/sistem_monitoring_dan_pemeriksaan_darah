"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  AlergiColumns,
  AlergiData,
} from "@/features/submission/types/alergi_data";
import { getAlergi } from "@/services/alergi";
import { toAlergiData } from "@/features/submission/utils/alergi_mapper";
import { Spinner } from "@/components/ui/spinner";
import { getKunjungan } from "@/services/kunjungan";
import { KunjunganData } from "@/services/pasien";
import { KunjunganColumns } from "@/features/submission/types/kunjungan_column";

export default function KunjunganPage() {
  const [kunjunganData, setKunjunganData] = useState<KunjunganData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        columns={KunjunganColumns}
        data={kunjunganData}
        tableName="Daftar Kunjungan"
        actionLink={null}
      />
    </div>
  );
}
