"use client";

import { useParams } from "next/navigation";
import KunjunganForm from "@/features/submission/components/kunjungan_form";

export default function CreateKunjunganPage() {
  const params = useParams<{ pasien_public_id: string }>();

  return <KunjunganForm pasien_public_id={params.pasien_public_id} />;
}
