import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

export type PekerjaanData = {
  public_id: string;
  nama: string;
};

export const PekerjaanColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<PekerjaanData>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "public_id",
    cell: ({ row }) => {
      const public_id = row.original.public_id;
      return (
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => onDelete(public_id)}
        >
          <TrashIcon />
        </Button>
      );
    },
  },
];
