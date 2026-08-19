import { FieldValues } from "react-hook-form";
import z from "zod";

export const DataLabSchema = z.object({
  parameter_public_id: z.guid(),
  nilai: z.number(),
});

export type DataLabFormValue = z.infer<typeof DataLabSchema>

export type HasDataLabs = FieldValues & {
  data_labs: DataLabFormValue[];
};
