"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "@/components/label";
import { IoAlertCircleSharp } from "react-icons/io5";
import Form from "@/components/form";
import Button from "@/components/button";
import useApiPrivate from "@/hooks/apiPrivate";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";
import { Clients } from "@/types/clients";
import moment from "moment-timezone";
import { Server } from "@/constants/server";
import Image from "next/image";
import { queryClient } from "@/hooks/queryClient";
import { toast } from "react-toastify";

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

const useCreate = (client: Clients) => {
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
    if (!client.id) return;

    const response = api.put(`/clients/update/${client.id}`, data);

    const res = await toast.promise(response, {
      success: "Dados atualizados com sucesso!",
      error: "Houve um erro, verifique os campos e tente novamente!",
      pending: "Atualizando os dados...",
    });

    await queryClient.invalidateQueries(['clients', client.code]);
    await queryClient.invalidateQueries(['clients']);
    
    reset();
  };

  async function uploadPhoto(e: any) {
    e.preventDefault();

    const file = e.target.files[0];
    const form = new FormData();
    form.append("photo", file);
    form.append("name", "Nome");

    const res = await api.put(`/clients/update/photo/${client.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return {
    handleSubmit,
    uploadPhoto,
    submit,
    control,
    errors,
    reset,
  };
};

export default function Create({ client }: { client: Clients }) {
  const { handleSubmit, uploadPhoto, submit, control, errors, reset } =
    useCreate(client);
  client.birth = moment(client.birth).format("YYYY-MM-DD");

  return (
    <Form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      bgTheme={false}
      className="max-w-[30rem] rounded-md "
      onSubmit={handleSubmit(submit)}
    >
      <header className="flex w-full opacity-80 hover:opacity-100 transition-all">
        <Link
          href="/clients"
          className={`gap-2 flex items-center ${fontOpenSans} font-semibold opacity-80`}
        >
          <FaChevronLeft />
          Clientes
        </Link>
      </header>
      <div className="flex mx-auto flex-col opacity-60 font-semibold gap-5">
        <div className="flex flex-col justify-center items-center gap-1">
          <h2 className="text-center">Foto do cliente</h2>
          <div className="bg-zinc-500 bg-opacity-20 w-[10rem] h-[10rem] rounded-xl relative overflow-hidden">
            <Image
              className="hover:scale-[1.1] transition-all"
              src={`${Server}/uploads/clients/${client?.photo}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              fill
              quality={50}
              style={{ objectFit: "cover" }}
              alt="Foto do usuario"
            />
          </div>
        </div>
        <input type="file" onChange={uploadPhoto} />
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
            defaultValue={client[form.name as keyof CreateClientFormData] || ""}
            render={({ field }) => (
              <input
                {...field}
                type={form?.type || "text"}
                className={`border bg-gray-100 dark:bg-neutral-900 dark:border-zinc-800 font-semibold outline-none  focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none p-3`}
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
          className="bg-gradient-45 from-cyan-600 to-blue-600 rounded p-3 text-lg text-white"
          type="button"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button className="opacity-80 bg-gradient-45 from-purple-600 to-cyan-600 rounded p-3 flex-1 text-lg text-white">
          Concluído
        </Button>
      </div>
    </Form>
  );
}
