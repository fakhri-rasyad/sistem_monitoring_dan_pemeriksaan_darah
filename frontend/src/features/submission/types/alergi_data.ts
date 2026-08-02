import { ColumnDef } from "@tanstack/react-table"

export type AlergiData = {
  public_id: string,
  nama: string
}

export const AlergiColumns: ColumnDef<AlergiData>[] = [
  {
    accessorKey: "nama",
    header: "Nama"
  },
]
