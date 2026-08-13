import { KunjunganData } from "@/services/pasien";
import { ColumnDef } from "@tanstack/react-table";
import { dateToSugar } from "@/features/dashboard/utils/date_converter";
import NavigationButton from "@/components/shared/navigation_button";

export const KunjunganColumns: ColumnDef<KunjunganData>[] = [
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
];

export const PasienDetailKunjunganColumns: ColumnDef<KunjunganData>[] = [
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
];
