"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  AlergiColumns,
  AlergiData,
} from "@/features/submission/types/alergi_data";
import { getAlergi } from "@/services/alergi";
import { toAlergiData } from "@/features/submission/utils/alergi_mapper";
import { getPantangan } from "@/services/pantangan";
import { toPantanganData } from "@/features/submission/utils/pantangan_mapper";
import { PantanganColumns } from "@/features/submission/types/pantangan_data";
import { Spinner } from "@/components/ui/spinner";

export default function PantanganiPage() {
  const [pantanganData, setPantanganData] = useState<AlergiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="container mx-auto py-10 px-24">
      <DataTables
        columns={PantanganColumns}
        data={pantanganData}
        tableName="Daftar Pantangan"
        actionLink={null}
      />
    </div>
  );
}
