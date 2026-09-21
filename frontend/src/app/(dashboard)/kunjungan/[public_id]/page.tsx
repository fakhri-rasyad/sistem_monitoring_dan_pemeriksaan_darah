"use client";

import Info from "@/components/shared/info";
import NavigationButton from "@/components/shared/navigation_button";
import { SectionCard } from "@/components/shared/section_card";
import TextInfo from "@/components/shared/text_info";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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
import {
  CirclePercent,
  HeartPulse,
  Pencil,
  Receipt,
  SearchCheck,
  Stethoscope,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function KunjunganDetail({
  params,
}: {
  params: Promise<{ public_id: string }>;
}) {
  const publicId = use(params);
  const [kunjungan, setKunjungan] = useState<KunjunganData>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
    return <div className="p-6">Data kunjungan tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <span>Data Kunjungan</span>

          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(`/kunjungan/edit/${publicId.public_id}`)}
          >
            <Pencil />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
            <SectionCard
              id="tensi_darah"
              title="Tensi Darah"
              description="Detail tensi darah pasien"
              icon={HeartPulse}
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Info label="Tensi" value={`${kunjungan.tensi} mmHg`} />
              </div>
            </SectionCard>
            <SectionCard
              id="komposisi_tubuh"
              title="Komposisi Tubuh"
              description="Detail komposisi tubuh pasien saat pemeriksaan"
              icon={CirclePercent}
            >
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
            </SectionCard>
          </div>
          <SectionCard
            id="data_laboratorium"
            title="Data Laboratorium"
            description="Detail hasil pemeriksaan laboratorium"
            icon={Stethoscope}
          >
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
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Tidak ada data laboratorium.
                    </TableCell>
                  </TableRow>
                ) : (
                  kunjungan.data_lab.map((lab) => (
                    <TableRow key={lab.public_id}>
                      <TableCell>{lab.parameter.nama}</TableCell>

                      <TableCell>{lab.nilai}</TableCell>

                      <TableCell>{lab.parameter.satuan}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </SectionCard>

          <SectionCard
            id="pemeriksaan"
            title="Pemeriksaan"
            description="Detail hasil pemeriksaan"
            icon={SearchCheck}
          >
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
          </SectionCard>
          <SectionCard
            id="tagihan"
            title="Tagihan"
            description="Detail tagihan kunjungan"
            icon={Receipt}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <TextInfo
                label="Tagihan Konsultasi"
                value={`Rp.${kunjungan.tagihan.biaya_konsultasi.toLocaleString(
                  "id-ID",
                )}`}
              />

              <TextInfo
                label="Tagihan Alat"
                value={`Rp.${kunjungan.tagihan.biaya_alat.toLocaleString("id-ID")}`}
              />

              <TextInfo
                label="Biaya Total"
                value={`Rp.${(
                  kunjungan.tagihan.biaya_alat +
                  kunjungan.tagihan.biaya_konsultasi
                ).toLocaleString("id-ID")}`}
              />

              <TextInfo
                label="Metode Pembayaran"
                value={kunjungan.tagihan.metode_pembayaran}
              />
            </div>
          </SectionCard>
        </CardContent>
      </Card>
    </div>
  );
}
