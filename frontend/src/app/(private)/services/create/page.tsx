"use client";
import { z } from "zod";
import * as S from "./style";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "@/components/label";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import useApiPrivate from "@/hooks/apiPrivate";

const createServicesFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  price: z.string(),
});

const formLabel = {
  name: { span: "Nome", place: "Criação de site" },
  price: { span: "Preço", place: "230,30" },
};

type CreateServicesFormSchema = z.infer<typeof createServicesFormSchema>;

function useCreate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServicesFormSchema>({
    resolver: zodResolver(createServicesFormSchema),
  });

  const api = useApiPrivate();

  async function addService(data: CreateServicesFormSchema) {
    console.log(data);
    const res = await api.post("/services", data);
    console.log(res);
  }

  return {
    form: {
      control,
      handleSubmit,
      addService,
      errors,
    },
  };
}

export default function Create() {
  const {
    form: { control, handleSubmit, addService, errors },
  } = useCreate();

  return (
    <S.Form
      onSubmit={handleSubmit(addService)}
      className="m-auto gap-3 max-w-[30rem] flex flex-col w-full shadow p-4 rounded-md"
    >
      <header className="w-full flex items-center opacity-50 justify-between">
        <Link href="/services" className="flex gap-2 items-center">
          <BiLeftArrowAlt size="20" />
          <h1 className="text-xl">Criar Serviço</h1>
        </Link>
      </header>
      <section className="flex flex-col gap-3">
        {Object.entries(formLabel).map(([name, value]) => {
          return (
            <Controller
              key={name}
              defaultValue=""
              name={name as keyof CreateServicesFormSchema}
              control={control}
              render={({ field }) => (
                <Label.Root className="m-0">
                  <Label.Title>{value.span}</Label.Title>
                  <input
                    className="focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5"
                    placeholder={value.place}
                    autoComplete="off"
                    {...field}
                  />
                </Label.Root>
              )}
            />
          );
        })}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Label.Root className="m-0">
              <Label.Title>Descrição</Label.Title>
              <textarea
                className="focus:shadow min-h-[10rem] rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5"
                placeholder={"Criação de leading pages"}
                autoComplete="off"
                {...field}
              />
            </Label.Root>
          )}
        />
      </section>
      <footer className=" flex items-center justify-between">
        <button className="bg-cyan-400 bg-opacity-60 p-3 px-4 opacity-70 hover:opacity-100 rounded">
          Salvar
        </button>
      </footer>
    </S.Form>
  );
}
