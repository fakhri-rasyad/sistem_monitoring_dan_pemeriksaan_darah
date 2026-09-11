import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

export type PantanganData = {
  public_id: string;
  nama: string;
};

export const PantanganColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<PantanganData>[] => [
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
