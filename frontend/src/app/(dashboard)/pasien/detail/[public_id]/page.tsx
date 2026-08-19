// app/(dashboard)/pasien/[publicId]/page.tsx

"use client";

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPasienDetail, PasienDetailResponse } from "@/services/pasien";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import DataTables from "@/components/layouts/data-table";
import { PasienDetailKunjunganColumns } from "@/features/submission/types/kunjungan_column";
import Info from "@/components/shared/info";
import formatDate from "@/utils/date";

export default function PasienDetailPage({
  params,
}: {
  params: Promise<{ public_id: string }>;
}) {
  const publicId = use(params);

  const [pasien, setPasien] = useState<PasienDetailResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPasienDetail(publicId.public_id);
        setPasien(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (publicId) {
      load();
    }
  }, [publicId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!pasien) {
    return <div className="p-6">Data pasien tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* DATA PASIEN */}
      <Card>
        <CardHeader>
          <CardTitle>Data Pasien</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Info label="Nama" value={pasien.nama} />

            <Info label="Nomor HP" value={pasien.nomor_hp} />

            <Info label="Email" value={pasien.email} />

            <Info label="Pekerjaan" value={pasien.pekerjaan?.nama} />

            <Info label="Tempat Lahir" value={pasien.tempat_lahir} />

            <Info
              label="Tanggal Lahir"
              value={formatDate(pasien.tanggal_lahir)}
            />

            <Info label="Alamat" value={pasien.alamat} />
          </div>
        </CardContent>
      </Card>

      {/* ALERGI & PANTANGAN */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alergi</CardTitle>
          </CardHeader>

          <CardContent>
            {pasien.alergi_pasien.length === 0 ? (
              <p className="text-sm text-muted-foreground">Tidak ada alergi.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {pasien.alergi_pasien.map((item) => (
                  <div
                    key={item.public_id}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    {item.alergi.nama}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pantangan</CardTitle>
          </CardHeader>

          <CardContent>
            {pasien.pantangan_pasien.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Tidak ada pantangan.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {pasien.pantangan_pasien.map((item) => (
                  <div
                    key={item.public_id}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    {item.pantangan.nama}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto">
        <DataTables
          columns={PasienDetailKunjunganColumns}
          data={pasien.kunjungan}
          tableName="Daftar Kunjungan"
          actionLink={null}
        />
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle>Riwayat Kunjungan</CardTitle>
        </CardHeader>


      </Card> */}
    </div>
  );
}
