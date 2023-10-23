import { ComponentType } from "react";
import { z } from "zod";

export const createEventsFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  allDay: z.boolean(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  color: z.string(),
});

export type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;
export type KeyOfEventsFormData = keyof CreateEventsFormData;
export type LabelFormDataEvents = LabelFormEventsDataProps[];

export interface DetailsProps {
  params: {
    code: string;
  };
}

export interface LabelFormEventsDataProps {
  name: string;
  span?: string;
  ex?: string;
  type?: string;
  default?: string;
  component?: ComponentType;
}
