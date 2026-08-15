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
import { getPPDH } from "@/services/ppdh";
import { toPpdhData } from "@/features/submission/utils/ppdh_mapper";
import { Spinner } from "@/components/ui/spinner";

export default function PpdhPage() {
  const [ppdhData, setPpdhData] = useState<PpdhData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        columns={PpdhColumns}
        data={ppdhData}
        tableName="Parameter pemeriksaan darah"
        actionLink={null}
      />
    </div>
  );
}
