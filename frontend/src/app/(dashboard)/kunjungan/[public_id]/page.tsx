"use client";

import Info from "@/components/shared/info";
import TextInfo from "@/components/shared/text_info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getKunjunganDetail } from "@/services/kunjungan";
import { KunjunganData } from "@/services/pasien";
import formatDate from "@/utils/date";
import { use, useEffect, useState } from "react";

export default function KunjunganDetail({
  params,
}: {
  params: Promise<{ public_id: string }>;
}) {
  const publicId = use(params);
  const [kunjungan, setKunjungan] = useState<KunjunganData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getKunjunganDetail(publicId.public_id);
        setKunjungan(data.Data);
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

  if (!kunjungan) {
    return <div className="p-6">Data pasien tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <Card>
        <CardHeader>Data Kunjungan</CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="mb-3 font-medium">Tekanan Darah</h3>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Info label="Tensi" value={`${kunjungan.tensi} mmHg`} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="mb-3 font-medium">Komposisi Tubuh</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Info
                    label="Berat Badan"
                    value={`${kunjungan.komposisi_tubuh.berat_badan} Kg`}
                  />

                  <Info
                    label="Tinggi Badan"
                    value={`${kunjungan.komposisi_tubuh.tinggi_badan} cm`}
                  />

                  <Info
                    label="BMI"
                    value={`${kunjungan.komposisi_tubuh.indeks_massa_tubuh} Kg/m²`}
                  />

                  <Info
                    label="Air Tubuh"
                    value={`${kunjungan.komposisi_tubuh.air_tubuh}`}
                  />

                  <Info
                    label="Massa Otot"
                    value={`${kunjungan.komposisi_tubuh.massa_otot} Kg`}
                  />

                  <Info
                    label="Massa Lemak"
                    value={`${kunjungan.komposisi_tubuh.massa_lemak} Kg`}
                  />

                  <Info
                    label="Massa Tulang"
                    value={`${kunjungan.komposisi_tubuh.massa_tulang} Kg`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="mb-3 font-medium">Data Laboratorium</h3>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis Pemeriksaan</TableHead>
                    <TableHead>Nilai Tercatat</TableHead>
                    <TableHead>Satuan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kunjungan.data_lab.length === 0 ? (
                    <TableCell>Tidak ada data laboratorium.</TableCell>
                  ) : (
                    kunjungan.data_lab.map((lab) => (
                      <TableRow>
                        <TableCell>{lab.parameter.nama}</TableCell>

                        <TableCell>{lab.nilai}</TableCell>

                        <TableCell>{lab.parameter.satuan}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="mb-3 font-medium">Pemeriksaan</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Info
                  label="Diperiksa At"
                  value={formatDate(kunjungan.pemeriksaan.diperiksa_at)}
                />

                <TextInfo
                  label="Subjective"
                  value={kunjungan.pemeriksaan.subjective}
                />

                <TextInfo
                  label="Objective"
                  value={kunjungan.pemeriksaan.objective}
                />

                <TextInfo
                  label="Evaluasi"
                  value={kunjungan.pemeriksaan.evaluasi}
                />

                <TextInfo
                  label="Planning Terapi"
                  value={kunjungan.pemeriksaan.planning_terapi}
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
