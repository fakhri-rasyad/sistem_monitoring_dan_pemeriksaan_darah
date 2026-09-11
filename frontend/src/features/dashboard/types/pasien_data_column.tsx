import { ColumnDef } from "@tanstack/react-table";
import { dateToSugar } from "../utils/date_converter";
import NavigationButton from "@/components/shared/navigation_button";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export type PasienData = {
  public_id: string;
  nama: string;
  pekerjaan: string;
  tanggalLahir: string;
};

export const PasienColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<PasienData>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "pekerjaan",
    header: "Pekerjaan",
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    cell: ({ row }) => {
      return dateToSugar(row.getValue("tanggalLahir"));
    },
  },
  {
    id: "action",
    accessorKey: "public_id",
    header: "Detail",
    cell: ({ row }) => {
      return (
        <NavigationButton
          navigationLink={`/pasien/detail/${row.original.public_id}`}
        />
      );
    },
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
