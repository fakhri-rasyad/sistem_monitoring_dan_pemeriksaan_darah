import { ColumnDef } from "@tanstack/react-table"

export type PpdhData = {
  public_id: string,
  nama: string,
  satuan: string,
}

export const PpdhColumns: ColumnDef<PpdhData>[] = [
  {
    accessorKey: "nama",
    header: "Nama"
  },
  {
    accessorKey: "satuan",
    header: "Satuan"
  }
]
