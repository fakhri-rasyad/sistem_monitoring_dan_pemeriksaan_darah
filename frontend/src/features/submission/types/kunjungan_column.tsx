import { KunjunganData } from "@/services/pasien";
import { ColumnDef } from "@tanstack/react-table";
import { dateToSugar } from "@/features/dashboard/utils/date_converter";
import NavigationButton from "@/components/shared/navigation_button";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const KunjunganColumns = (
  onDelete: (publicId: string) => void,
): ColumnDef<KunjunganData>[] => [
  {
    accessorKey: "pasien.nama",
    header: "Nama",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal Kunjungan",
    cell: ({ row }) => {
      return dateToSugar(row.getValue("tanggal"));
    },
  },
  {
    id: "action",
    accessorKey: "public_id",
    header: "Detail",
    cell: ({ row }) => {
      const public_id = row.original.public_id;

      return <NavigationButton navigationLink={`/kunjungan/${public_id}`} />;
    },
  },
  {
    id: "delete",
    header: "Hapus",
    cell: ({ row }) => {
      const public_id = row.original.public_id;

      return (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(public_id)}
        >
          <TrashIcon />
        </Button>
      );
    },
  },
];

export const PasienDetailKunjunganColumns = (
  onDelete: (publicId: string) => void,
): ColumnDef<KunjunganData>[] => [
  {
    accessorKey: "tanggal",
    header: "Tanggal Kunjungan",
    cell: ({ row }) => {
      return dateToSugar(row.getValue("tanggal"));
    },
  },
  {
    id: "action",
    accessorKey: "public_id",
    header: "Detail",
    cell: ({ row }) => {
      const public_id = row.original.public_id;
      return <NavigationButton navigationLink={`/kunjungan/${public_id}`} />;
    },
  },
  {
    id: "delete",
    header: "Hapus",
    cell: ({ row }) => {
      const public_id = row.original.public_id;

      return (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(public_id)}
        >
          <TrashIcon />
        </Button>
      );
    },
  },
];
