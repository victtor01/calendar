"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input/input";
import Label from "@/components/label";
import { IoAlertCircleSharp } from "react-icons/io5";
import Form from "@/components/form";
import Button from "@/components/button";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";

interface LabelFormData {
  name: string;
  span: string;
  ex?: string;
  type?: string;
}

const labelFormData: LabelFormData[] = [
  { name: "firstName", span: "Primeiro Nome", ex: "Reginaldo" },
  { name: "lastName", span: "Sobrenome", ex: "Nunes" },
  { name: "email", span: "E-mail", ex: "exemple@gmail.com" },
  { name: "cpf", span: "CPF", ex: "000.000.000-00" },
  { name: "cep", span: "CEP", ex: "00000-00" },
  { name: "phone", span: "Telefone", ex: "(00) 00000-0000" },
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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(CreateClientFormSchema),
  });

  const api = useApiPrivate();

  const submit = async (data: CreateClientFormData) => {
    const response = await api.put("/clients/create", data);
    if (response.data) {
      queryClient.invalidateQueries(["clients"]);
    }
    reset();
    console.log(data);
  };

  return {
    handleSubmit,
    submit,
    control,
    errors,
    reset,
  };
};

export default function Create() {
  const { handleSubmit, submit, control, errors, reset } = useCreate();

  return (
    <Form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      bgTheme
      className="max-w-[30rem] m-auto rounded-md"
      onSubmit={handleSubmit(submit)}
    >
      <header className="flex w-full opacity-80 hover:opacity-100 transition-all">
        <Link href="/clients" className={`gap-2 flex items-center ${fontOpenSans} font-semibold opacity-80`}>
          <FaChevronLeft />
          Clientes
        </Link>
      </header>
      <div className="flex w-full flex-col opacity-60 font-semibold gap-2">
        <h2>Foto do cliente</h2>
        <div className="bg-zinc-300 w-[10rem] h-[10rem] rounded-xl">
          
        </div>
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
            render={({ field }) => (
              <Input
                register={field}
                type={form?.type || "text"}
                className={`border focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none px-3e`}
                autoComplete="off"
                placeholder={form.ex ? `ex: ${form.ex}` : ""}
              />
            )}
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
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded p-3 text-lg text-white"
          type="button"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button className="opacity-80 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded p-3 flex-1 text-lg text-white">
          Concluído
        </Button>
      </div>
    </Form>
  );
}
