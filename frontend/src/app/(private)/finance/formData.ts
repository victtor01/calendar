import { NumericFormat } from 'react-number-format'

export const formDataLabel = [
  { name: "name", span: "Nome", ex: "João Pereira" },
  { name: "value", span: "Valor", ex: "123,43"},
  { name: "date", span: "Data", type: "date" },
  { name: "description", span: "Descrição", type: "textarea" },
];

export interface FormDataLabel {
  name: string;
  span: string;
  ex?: string;
  type?: string;
  input?: React.ReactNode
}
