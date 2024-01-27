"use client";

import useApiPrivate from "@/hooks/apiPrivate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateContactFormData = z.infer<typeof createContactFormSchema>;

const createContactFormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  email: z.string().email(),
});

function useContact() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateContactFormData>({
    resolver: zodResolver(createContactFormSchema),
  });

  const api = useApiPrivate();

  const create = async (data: CreateContactFormData) => {
    const res = await api.post("/email/contact", data);
    console.log(res);
  };

  return {
    control,
    register,
    handleSubmit,
    errors,
    reset,
    create,
  };
}

export function Form() {
  const { control, register, errors, handleSubmit, reset, create } =
    useContact();

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(create)}>
      <input
        type="email"
        {...register("email")}
        placeholder="Digite seu email..."
        className="p-3 outline-none bg-zinc-900 rounded font-semibold"
      />
      {errors?.email && errors?.email?.message}
      <input
        type="text"
        {...register("title")}
        placeholder="Digite o título..."
        className="p-3 outline-none bg-zinc-900 rounded font-semibold"
      />
      {errors?.title && errors?.title?.message}
      <textarea
        {...register("description")}
        placeholder="Digite sua dúvida..."
        className="p-3 resize-none outline-none bg-zinc-900 rounded h-[10rem]"
      ></textarea>
      {errors?.description && errors?.description?.message}
      <button className="w-full bg-indigo-600 text-white font-semibold rounded p-4 opacity-75 hover:opacity-100 mt-2">
        Enviar
      </button>
    </form>
  );
}
