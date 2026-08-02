"use client"


import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tableName: string,
  actionLink: string | null,
}

export default function DataTables<TData, TValue>({
  columns,
  data,
  tableName,
  actionLink,
}: DataTableProps<TData, TValue>){

  const router = actionLink ? useRouter() : null
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  return (
    <div className="data-table">
      <div className="bg-blue-900 flex flex-row justify-between px-4 py-2 rounded-t-md">
        <h3 className="font-bold text-white">{tableName}</h3>
        {(actionLink && router) && (
          <Button
            variant="outline"
            onClick={() => router.push(actionLink)}
          > + Tambah {tableName}
          </Button>
        )}
      </div>
      <div className="overflow-hidden rounded-b-md border">
      <Table>
        <TableHeader>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {
                          header.isPlaceholder ? null :
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                      </TableHead>
                    )
                  })
                }
              </TableRow>
            ))
          }
        </TableHeader>
        <TableBody >
          {
            table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ): (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data untuk ditampilkan
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        > Sebelumnya
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        > Setelahnya
        </Button>
      </div>
    </div>
  )
}
