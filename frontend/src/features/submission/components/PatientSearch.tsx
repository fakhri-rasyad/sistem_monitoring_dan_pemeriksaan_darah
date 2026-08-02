"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { PatientOption, searchPasien } from "@/services/pasien";
import { useDebounce } from "@/hooks/use_debounce";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  value?: string;

  onChange: (value: string) => void;
}

export default function PatientSearch({
  value,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const [query, setQuery] = React.useState("");

  const [patients, setPatients] =
    React.useState<PatientOption[]>([]);

  const [loading, setLoading] =
    React.useState(false);

  const debounced =
    useDebounce(query);

  React.useEffect(() => {

    async function load() {

      if (!debounced) {

        setPatients([]);

        return;
      }

      try {

        setLoading(true);

        const data =
          await searchPasien(debounced);

        setPatients(data);

      } finally {

        setLoading(false);

      }
    }

    load();

  }, [debounced]);

  const selected =
    patients.find(
      p => p.public_id === value
    );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>

        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >

          {selected
            ? selected.nama
            : "Cari pasien..."}

          <ChevronsUpDown className="opacity-50" />

        </Button>

      </PopoverTrigger>

      <PopoverContent
        className="w-[450px] p-0"
      >

        <Command shouldFilter={false}>

          <CommandInput
            placeholder="Cari nama pasien..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>

            {loading && (
              <div className="py-6 text-center text-sm">
                Loading...
              </div>
            )}

            <CommandEmpty>
              Tidak ada pasien.
            </CommandEmpty>

            <CommandGroup>

              {patients.map(patient => (

                <CommandItem
                  key={patient.public_id}
                  value={patient.public_id}
                  onSelect={() => {

                    onChange(patient.public_id);

                    setOpen(false);

                  }}
                >

                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === patient.public_id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  <div>

                    <div>

                      {patient.nama}

                    </div>

                    <div
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >

                      {patient.nomor_hp}

                    </div>

                  </div>

                </CommandItem>

              ))}

            </CommandGroup>

          </CommandList>

        </Command>

      </PopoverContent>

    </Popover>
  );
}
