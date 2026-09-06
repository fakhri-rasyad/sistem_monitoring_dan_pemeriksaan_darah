import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

export type PpdhData = {
  public_id: string;
  nama: string;
  satuan: string;
};

export const PpdhColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<PpdhData>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "satuan",
    header: "Satuan",
  },
  {
    accessorKey: "public_id",
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
