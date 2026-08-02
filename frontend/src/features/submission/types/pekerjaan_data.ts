import { ColumnDef } from "@tanstack/react-table"

export type PekerjaanData = {
  public_id: string,
  nama: string
}

export const PekerjaanColumns: ColumnDef<PekerjaanData>[] = [
  {
    accessorKey: "nama",
    header: "Nama"
  },
]
