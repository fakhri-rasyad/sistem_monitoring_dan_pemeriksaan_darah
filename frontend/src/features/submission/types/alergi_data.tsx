import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export type AlergiData = {
  public_id: string;
  nama: string;
};

export const AlergiColumns = (
  onDelete: (public_id: string) => void,
): ColumnDef<AlergiData>[] => [
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
