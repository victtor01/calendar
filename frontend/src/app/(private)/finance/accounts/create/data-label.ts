export const formDataLabel = [
  { name: "name", span: "Nome", ex: "João Pereira" },
  { name: "description", span: "Descrição", ex: "ITAÙ" },
];

export interface FormDataLabel {
  name: string;
  span: string;
  ex?: string;
  type?: string;
}
