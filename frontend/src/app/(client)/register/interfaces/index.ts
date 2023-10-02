import { IconType } from "react-icons";

export interface FormData {
  name: string;
  span?: string;
  ex?: string;
  type?: string;
}

export interface List {
  name: string;
  icon: IconType;
  items?: FormData[];
}
