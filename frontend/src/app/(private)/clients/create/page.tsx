"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "@/components/label";
import { IoAlertCircleSharp } from "react-icons/io5";
import Form from "@/components/form";
import { Button } from "@nextui-org/react";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { GoArrowLeft } from "react-icons/go";
import { fontOpenSans } from "@/app/fonts";
import { PatternFormat } from "react-number-format";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LabelFormData {
  name: string;
  span: string;
  ex?: string;
  type?: string;
  format?: string;
}

const labelFormData: LabelFormData[] = [
  { name: "firstName", span: "Primeiro Nome", ex: "Reginaldo" },
  { name: "lastName", span: "Sobrenome", ex: "Nunes" },
  { name: "email", span: "E-mail", ex: "exemple@gmail.com" },
  { name: "cpf", span: "CPF", ex: "000.000.000-00", format: "###.###.###-###" },
  { name: "cep", span: "CEP", ex: "00000-000", format: "#####-###" },
  {
    name: "phone",
    span: "Telefone",
    ex: "(00) 00000-0000",
    format: "(##) #####-####",
  },
  { name: "street", span: "Rua", ex: "Exemple Exemple" },
  { name: "birth", span: "aniversário", type: "date" },
];

type CreateClientFormData = z.infer<typeof CreateClientFormSchema>;

const CreateClientFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  cep: z.string(),
  phone: z.string(),
  street: z.string(),
  birth: z.string(),
});

const useCreate = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(CreateClientFormSchema),
  });

  const api = useApiPrivate();

  const createClient = async (data: CreateClientFormData) => {
    const response = api.post("/clients/create", data);

    const res = await toast.promise(response, {
      pending: "Criando cliente",
      success: "Oncluído com sucesso! redirecionando...",
      error: "Houve algum erro, tente novamente mais tarde!",
    });

    await queryClient.invalidateQueries(["clients"]);

    router.push("/clients");

    reset();
  };

  return {
    handleSubmit,
    createClient,
    control,
    errors,
    reset,
  };
};

export default function Create() {
  const { handleSubmit, createClient, control, errors, reset } = useCreate();

  return (
    <Form
      bgTheme
      className="max-w-[30rem] m-auto"
      onSubmit={handleSubmit(createClient)}
    >
      <div className="flex-1 w-full flex">
        <Link
          href={"/clients"}
          className="rounded w-full justify-center flex items-center transition-all duration-300 gap-1 hover:gap-3 opacity-60 max-w-[8rem] hover:opacity-100"
        >
          <GoArrowLeft size="20" />
          <span className={`text-xl ${fontOpenSans} font-semibold`}>
            Clientes
          </span>
        </Link>
      </div>
      {labelFormData.map((form: LabelFormData, index: number) => (
        <Label.Root
          key={`${form.name}-${index}`}
          className="flex flex-col mt-4"
        >
          <span className="text-[1rem] font-semibold opacity-60">
            {form.span}
          </span>
          <Controller
            name={form.name as keyof CreateClientFormData}
            control={control}
            defaultValue=""
            render={({ field }) =>
              form.format ? (
                <PatternFormat
                  {...field}
                  format={form.format}
                  autoComplete="off"
                  placeholder={form.ex ? `ex: ${form.ex}` : ""}
                  className="focus:shadow rounded-md transition-shadow p-4 outline-none font-semibold bg-zinc-400 text-gray-700 dark:text-gray-300 bg-opacity-5"
                />
              ) : (
                <input
                  {...field}
                  type={form?.type || "text"}
                  className="focus:shadow rounded-md transition-shadow p-4 outline-none font-semibold bg-zinc-400 text-gray-700 dark:text-gray-300 bg-opacity-5"
                  autoComplete="off"
                  placeholder={form.ex ? `${form.ex}` : ""}
                />
              )
            }
          />
          {errors[form.name as keyof CreateClientFormData] && (
            <span className="opacity-90 text-red-400 text-normal flex gap-1 items-center">
              <IoAlertCircleSharp />
              {errors[form.name as keyof CreateClientFormData]?.message}
            </span>
          )}
        </Label.Root>
      ))}
      <div className="flex w-full gap-2">
        <Button
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded p-6 text-lg text-white"
          type="button"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button
          type="submit"
          className="opacity-80 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded p-6 flex-1 text-lg text-white"
        >
          Concluído
        </Button>
      </div>
    </Form>
  );
}
