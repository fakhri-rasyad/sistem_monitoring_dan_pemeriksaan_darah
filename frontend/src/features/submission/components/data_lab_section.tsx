"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { PlusIcon, Trash2 } from "lucide-react";
import { ParameterResponse } from "../types/api";
import { AddPPDH, getPPDH } from "@/services/ppdh";
import { PemeriksaanFormValues } from "../schema/pemeriksaan_form_schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

interface Props {
  form: UseFormReturn<PemeriksaanFormValues>;
}

export default function DataLabSection({ form }: Props) {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data_labs",
  });

  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );

  const [parameters, setParameters] = useState<ParameterResponse[]>([]);
  const [namaParameterBaru, setNamaParameterBaur] = useState<string>("");
  const [satuanParameterBaru, setSatuanParameterBaru] = useState<string>("");
  const [openParameter, setParameterOpen] = useState<boolean>(false);

  async function addParameter() {
    const nama = namaParameterBaru.trim();

    if (!nama) {
      toast.error("Nama parameter tidak boleh kosong");
      return;
    }

    const satuan = satuanParameterBaru.trim();
    if (!satuan) {
      toast.error("Satuan parameter tidak boleh kosong");
      return;
    }

    try {
      const res = await AddPPDH(nama, satuan);

      toast.success(res.Message);

      setParameters((current) => [...current, res.Data]);

      setNamaParameterBaur("");
      setSatuanParameterBaru("");
      setParameterOpen(false);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Terjadi kesalahan saat menambah parameter",
      );
    }
  }

  const [nilai, setNilai] = useState("");
  const handleNamaParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNamaParameterBaur(event.target.value);
  };
  const handleSatuanParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSatuanParameterBaru(event.target.value);
  };

  useEffect(() => {
    async function load() {
      const res = await getPPDH();
      setParameters(res);
    }

    load();
  }, []);

  function handleAdd() {
    if (!selectedParameter) return;

    append({
      parameter_public_id: selectedParameter,
      nilai: Number(nilai),
    });

    setSelectedParameter(null);
    setNilai("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Laboratorium</CardTitle>
        <CardDescription>
          Tambahkan hasil pemeriksaan laboratorium pasien.
        </CardDescription>
        <CardAction>
          <Dialog open={openParameter} onOpenChange={setParameterOpen}>
            <DialogTrigger
              render={
                <Button type="button" variant="outline">
                  <PlusIcon data-icon="inline-start" /> Tambah Parameter
                </Button>
              }
            />

            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Tambah Parameter</DialogTitle>
              </DialogHeader>

              <Field>
                <FieldLabel htmlFor="nama-parameter">Nama Parameter</FieldLabel>
                <Input
                  id="nama-parameter"
                  value={namaParameterBaru}
                  onChange={handleNamaParameterChange}
                  placeholder="Tambahkan nama parameter di sini"
                />
                <Input
                  id="satuan-parameter"
                  value={satuanParameterBaru}
                  onChange={handleSatuanParameterChange}
                  placeholder="Tambahkan satuan parameter di sini"
                />
              </Field>

              <DialogFooter>
                <DialogClose
                  render={
                    <Button type="button" variant="outline">
                      Batal
                    </Button>
                  }
                />

                <Button type="button" onClick={addParameter}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-[2fr_1fr_auto] gap-3">
          <Select
            value={selectedParameter}
            onValueChange={setSelectedParameter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Parameter">
                {
                  parameters.find((item) => item.public_id == selectedParameter)
                    ?.nama
                }
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {parameters.map((item) => (
                <SelectItem key={item.public_id} value={item.public_id}>
                  {item.nama} - ({item.satuan})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Nilai"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          />

          <Button type="button" onClick={handleAdd}>
            Tambah
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  Belum ada data laboratorium.
                </TableCell>
              </TableRow>
            )}

            {fields.map((field, index) => {
              const parameter = parameters.find(
                (p) => p.public_id === field.parameter_public_id,
              );

              return (
                <TableRow key={field.id}>
                  <TableCell>{parameter?.nama ?? "-"}</TableCell>

                  <TableCell>{field.nilai}</TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
