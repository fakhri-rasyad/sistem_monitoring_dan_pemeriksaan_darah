"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiwayatPenyakitData } from "./riwayat_penyakit_response";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const RiwayatPenyakitColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<RiwayatPenyakitData>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "public_id",
    header: "Hapus",
    cell: ({ row }) => {
      const public_id = row.original.public_id;
      return (
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => onDelete(public_id)}
        >
          <TrashIcon />
        </Button>
      );
    },
  },
];
