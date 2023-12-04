"use client";

import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import * as S from "../../styles";

import Label from "@/components/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import { Service } from "@/types/services";
import Loading from "@/components/loading";
import Empty from "@/components/empty";

interface EditProps {
  params: {
    code: string;
  };
}

const createServicesFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
});

type CreateServicesFormSchema = z.infer<typeof createServicesFormSchema>;

function useEdit(code: string) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServicesFormSchema>({
    resolver: zodResolver(createServicesFormSchema),
  });

  const api = useApiPrivate();

  const { data: service, isLoading: loadingService } = useQuery({
    queryKey: ["services", code],
    queryFn: async (): Promise<Service> => {
      return (await api.get("/services/find-by-code/" + code)).data;
    },
  });

  return {
    form: {
      control,
      handleSubmit,
      errors,
    },
    data: {
      service,
      loadingService,
    },
  };
}

export default function Edit({ params: { code } }: EditProps) {
  const {
    form: { control, handleSubmit, errors },
    data: { service, loadingService },
  } = useEdit(code);

  if (loadingService) return <Loading className="bg-cyan-500" />;
  if (!service) return <Empty />;

  return (
    <S.Form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      /* onSubmit={handleSubmit(addService)} */
      className="m-auto gap-3 max-w-[30rem] flex flex-col w-full shadow p-4 rounded-md"
    >
      <header className="w-full flex items-center opacity-50 justify-between">
        <Link href="/services" className="flex gap-2 items-center">
          <BiLeftArrowAlt size="20" />
          <h1 className="text-xl">Meus serviços</h1>
        </Link>
      </header>
      <section className="flex flex-col gap-3">
        <Controller
          defaultValue={service.name}
          name={"name"}
          control={control}
          render={({ field }) => (
            <Label.Root className="m-0">
              <Label.Title>Nome</Label.Title>
              <input
                className="focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5"
                placeholder="Digite o nome do serviço..."
                autoComplete="off"
                {...field}
              />
            </Label.Root>
          )}
        />
        <Controller
          name="price"
          defaultValue={service.price.toString()}
          control={control}
          render={({ field }) => (
            <Label.Root className="m-0">
              <Label.Title>Preço</Label.Title>
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                decimalScale={2}
                className="focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5"
                placeholder="Digite o nome do serviço..."
                autoComplete="off"
                {...field}
              />
            </Label.Root>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={service.description}
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
      <button className="bg-cyan-400 bg-opacity-60 p-3 px-4 opacity-70 hover:opacity-100 rounded">
        Salvar
      </button>
    </S.Form>
  );
}
