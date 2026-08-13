// app/(dashboard)/pasien/[publicId]/page.tsx

"use client";

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPasienDetail, PasienDetailResponse } from "@/services/pasien";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

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

      {/* RIWAYAT KUNJUNGAN */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Kunjungan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {pasien.kunjungan.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada riwayat kunjungan.
            </p>
          ) : (
            pasien.kunjungan.map((kunjungan) => (
              <Card key={kunjungan.public_id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {formatDate(kunjungan.tanggal)}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* TENSI */}
                  <div>
                    <h3 className="mb-3 font-medium">Tekanan Darah</h3>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <Info
                        label="Sistol"
                        value={`${kunjungan.tensi_sistol} mmHg`}
                      />

                      <Info
                        label="Diastol"
                        value={`${kunjungan.tensi_diastol} mmHg`}
                      />
                    </div>
                  </div>

                  {/* KOMPOSISI TUBUH */}
                  <div>
                    <h3 className="mb-3 font-medium">Komposisi Tubuh</h3>

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
                  </div>

                  {/* DATA LAB */}
                  <div>
                    <h3 className="mb-3 font-medium">Data Laboratorium</h3>

                    {kunjungan.data_lab.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Tidak ada data laboratorium.
                      </p>
                    ) : (
                      <div className="overflow-hidden rounded-md border">
                        {kunjungan.data_lab.map((lab) => (
                          <div
                            key={lab.public_id}
                            className="grid grid-cols-3 border-b p-3 text-sm last:border-0"
                          >
                            <span>{lab.parameter.nama}</span>

                            <span>{lab.nilai}</span>

                            <span className="text-muted-foreground">
                              {lab.parameter.satuan}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PEMERIKSAAN */}
                  <div>
                    <h3 className="mb-3 font-medium">Pemeriksaan</h3>

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
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}

function TextInfo({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="mb-1 text-sm text-muted-foreground">{label}</p>

      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        {value || "-"}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
