"use client";

import { useCallback, useEffect, useState } from "react";

import DataTables from "@/components/layouts/data-table";
import {
  PasienColumns,
  PasienData,
} from "@/features/dashboard/types/pasien_data_column";
import { PasienMapper } from "@/features/dashboard/utils/pasien_mapper";
import { getPasien } from "@/services/pasien";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const [pasienData, setPasienData] = useState<PasienData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        columns={PasienColumns}
        data={pasienData}
        tableName="Pasien"
        actionLink={"/submission"}
      />
    </div>
  );
}
