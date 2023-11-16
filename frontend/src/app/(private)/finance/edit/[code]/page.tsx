"use client";
import { LabelFormData, labelFormData } from "./label-form-data";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/input/input";
import Label from "@/components/label";
import { useState } from "react";
import Form from "@/components/form";
import moment from "moment";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
type OptionFinance = "INCOME" | "EXPENSE";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  value: z.string().nonempty("Preencha o valor!"),
  description: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z
    .string()
    .nonempty("Defina a data corretamente!")
    .refine((value) => new Date(value)),
});

interface EditProps {
  params: {
    code: string;
  };
}

const useEdit = (code: string) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  const { push } = useRouter();

  const getRegister = async () => {
    return (await api.get(`/registers/find/${code}`)).data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["register", code],
    queryFn: getRegister,
    enabled: true,
  });

  const [onMessageSucess, setOnMessageSucess] = useState<string | null>(null);

  const api = useApiPrivate();

  const updateRegister = async (data: CreateRegisterFormData) => {
    console.log(data);

    const response = await api.put(`/registers/update/${code}`, data);
    const { data: updated } = response;

    if (!updated) {
      return;
    }

    queryClient.invalidateQueries(["register"]);

    setOnMessageSucess("Registro atualizado com sucesso!");

    setTimeout(() => {
      push("/finance/registers");
    }, 1000);
  };

  return {
    control,
    handleSubmit,
    updateRegister,
    onMessageSucess,
    reset,
    data,
    isLoading,
    errors,
  };
};

export default function Edit({ params: { code } }: EditProps) {
  const {
    control,
    handleSubmit,
    onMessageSucess,
    reset,
    updateRegister,
    errors,
    isLoading,
    data,
  } = useEdit(code);

  if (isLoading) {
    return;
  }

  const date = moment(new Date(data.date)).format("YYYY-MM-DD");

  return (
    <Form
      bgTheme
      className="w-auto min-w-[30rem] m-auto flex-col shadow-md rounded-md"
      onSubmit={handleSubmit(updateRegister)}
    >
      {onMessageSucess && (
        <div className="p-4 bg-emerald-200 flex w-full rounded opacity-80 text-gray-900">
          {onMessageSucess}
        </div>
      )}
      <Link href={'/finance'} className="flex items-center gap-3 hover:gap-5 transition-[gap] text-2xl opacity-60 hover:opacity-100 w-full">
      <GoArrowLeft size="20"/>
        Registros
      </Link>
      <div className="text-white flex flex-col w-full gap-5">
        {labelFormData?.map((item: LabelFormData) => (
          <Controller
            key={item.name}
            name={item.name as keyof CreateRegisterFormData}
            control={control}
            defaultValue={data[item.name].toString()}
            render={({ field }) => (
              <Label.Root className="m-0">
                <span className=" opacity-90">{item.span}</span>
                <input
                  {...field}
                  type={item?.type || "text"}
                  className={`outline-none placeholder:opacity-40 rounded appearance-none focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5`}
                  placeholder={item?.ex}
                  autoComplete="off"
                />
                <div className="text-red-400">
                  {errors[item.name as keyof CreateRegisterFormData]?.message ||
                    null}
                </div>
              </Label.Root>
            )}
          />
        ))}
        <Controller
          name="date"
          control={control}
          defaultValue={date}
          render={({ field }) => (
            <Label.Root className="m-0">
              <span className="opacity-90">Data</span>
              <input
                {...field}
                type="date"
                className={`outline-none placeholder:opacity-40 rounded appearance-none focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5`}
                required
                autoComplete="off"
              />
            </Label.Root>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={data.description}
          render={({ field }) => (
            <Label.Root className="m-0">
              <span className="opacity-90">Descrição</span>
              <textarea
                {...field}
                className={`outline-none placeholder:opacity-40 rounded appearance-none focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5`}
              />
            </Label.Root>
          )}
        />
        <div className="flex gap-2 items-center w-full justify-between">
          <Controller
            name="type"
            control={control}
            defaultValue={data.type}
            render={({ field }) => (
              <>
                <Button
                  type="button"
                  className="bg-cyan-500 rounded text-white"
                  onClick={() =>
                    field.onChange(
                      field.value === "INCOME" ? "EXPENSE" : "INCOME"
                    )
                  }
                >
                  Mudar
                </Button>
                <div
                  className={`text-white transition-colors duration-300 p-3 h-full min-w-[7rem] rounded justify-center flex items-center ${
                    field.value === "INCOME" ? "bg-sky-500" : "bg-rose-500"
                  }`}
                >
                  {field.value === "INCOME" ? "Entrada" : "Saída"}
                </div>
              </>
            )}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full items-center justify-between">
        <button
          type="button"
          onClick={() => reset()}
          className="p-3 px-4 text-lg bg-blue-200 text-zinc-900 rounded opacity-90 hover:opacity-100"
        >
          Limpar
        </button>
        <button className="p-3 flex-1 px-4 text-lg text-zinc-900 bg-emerald-300 rounded opacity-80 hover:opacity-100">
          Enviar
        </button>
      </div>
    </Form>
  );
}
