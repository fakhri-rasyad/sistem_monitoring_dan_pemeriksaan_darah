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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tableName: string,
}

export default function DataTables<TData, TValue>({
  columns,
  data,
  tableName,
}: DataTableProps<TData, TValue>){
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  return (
    <div className="shadow-gray-600 shadow-sm rounded-md">
      <div className="bg-teal-700 px-4 py-2 rounded-t-md">
        <h3 className="font-bold text-white">{tableName}</h3>
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
