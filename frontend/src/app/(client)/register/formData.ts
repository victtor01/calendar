import { MdBadge, MdMail } from "react-icons/md";

export const formData = [
  {
    name: "Dados pessoais",
    icon: MdBadge,
    items: [
      { name: "firstName", span: "Nome", ex: "João Pereira" },
      { name: "lastName", span: "Sobrenome", ex: "da Nóbrega" },
      { name: "birth", span: "Aniversário", type: "date" },
      { name: "phone", span: "Telefone", ex: "(99) 99999-9999" },
      { name: "cpf", span: "CPF", ex: "111.222.333-44" },
      { name: "cep", span: "CEP", ex: "00000-000" },
    ],
  },
  {
    name: "Informações de login",
    icon: MdMail,
    items: [
      { name: "email", span: "E-mail", ex: "exemple@exemple.com" },
      {
        name: "password",
        span: "password",
        ex: "b01728c934",
        type: "password",
      },
      {
        name: "repeatPassword",
        span: "Repetir senha",
        ex: "b01728c934",
        type: "password",
      },
    ],
  },
];
