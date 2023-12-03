export const formDataLabel: FormDataLabel[] = [
  { name: "name", span: "Nome", ex: "João Pereira", max: 55},
  { name: "value", span: "Valor", ex: "123,43", mask: '99.999,99'},
  { name: "date", span: "Data", type: "date" },
];

export interface FormDataLabel {
  name: string;
  span: string;
  ex?: string;
  type?: string;
  input?: React.ReactNode,
  max?: number,
  mask?: string
}
