import { Button } from "@/components/ui/button"
import { ButtonWithIcon } from "@/components/ui/shared_icon_button"
import {ColumnDef} from "@tanstack/react-table"
import { dateToSugar } from "../utils/date_converter"

export type PasienData = {
  public_id: string,
  nama: string
  pekerjaan: string
  tanggalLahir: string,
}

export const PasienColumns: ColumnDef<PasienData>[] = [
  {
    accessorKey: "nama",
    header: "Nama"
  },
  {
    accessorKey: "pekerjaan",
    header: "Pekerjaan"
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    cell: ({row}) => {
      return dateToSugar(row.getValue("tanggalLahir"))
    }
  },
  {
    id: "action",
    accessorKey:"public_id",
    header: "Detail",
    cell: ({row}) => {
     return (
      <Button>
        Detail
      </Button>
     )
    }
  },
]
