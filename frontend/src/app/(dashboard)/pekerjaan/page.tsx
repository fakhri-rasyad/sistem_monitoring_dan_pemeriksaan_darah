"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  AlergiColumns,
  AlergiData,
} from "@/features/submission/types/alergi_data";
import { getAlergi } from "@/services/alergi";
import { toAlergiData } from "@/features/submission/utils/alergi_mapper";
import { getPekerjaan } from "@/services/pekerjaan";
import {
  PekerjaanColumns,
  PekerjaanData,
} from "@/features/submission/types/pekerjaan_data";
import { toPekerjaanData } from "@/features/submission/utils/pekerjaan_mapper";
import { Spinner } from "@/components/ui/spinner";

export default function PekerjaanPage() {
  const [pekerjaanData, setPekerjanData] = useState<PekerjaanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        columns={PekerjaanColumns}
        data={pekerjaanData}
        tableName="Daftar Pekerjaan"
        actionLink={null}
      />
    </div>
  );
}
