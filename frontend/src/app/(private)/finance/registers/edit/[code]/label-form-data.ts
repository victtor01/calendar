'use client'
export const labelFormData = [
  { name: "name", span: "Nome", ex: "João Pereira" },
  { name: "value", span: "Valor", ex: "123,43" },
];

export interface LabelFormData {
  name: string,
  span?: string,
  ex?: string,
  type?: string
}