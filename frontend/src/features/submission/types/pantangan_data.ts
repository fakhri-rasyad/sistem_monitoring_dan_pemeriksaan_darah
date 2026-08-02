import { ColumnDef } from "@tanstack/react-table"

export type PantanganData = {
  public_id: string,
  nama: string
}

export const PantanganColumns: ColumnDef<PantanganData>[] = [
  {
    accessorKey: "nama",
    header: "Nama"
  },
]
