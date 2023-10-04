import { IconType } from "react-icons";

export interface FormDataProps {
  name: string;
  span?: string;
  ex?: string;
  type?: string;
}

export interface ListProps {
  name: string;
  icon: IconType;
  items?: FormDataProps[];
}
