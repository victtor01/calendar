"use client";

import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Accounts, useAccounts } from "@/hooks/useAccounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type UpdateAccountFormData = z.infer<typeof updateAccountFormSchema>;

interface EditProps {
  params: {
    code: string;
  };
}

const updateAccountFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório!"),
  description: z.string(),
});

function useEdit(account: Accounts | undefined) {
  const { register, control, handleSubmit } = useForm<UpdateAccountFormData>({
    resolver: zodResolver(updateAccountFormSchema),
  });

  const router = useRouter();
  const api = useApiPrivate();

  async function updateAccounts(data: UpdateAccountFormData) {
    if (!account) return;

    const res = (
      await api.put(`/accounts/update/${account.id}`, {
        name: data.name,
        description: data.description,
      })
    ).data;

    await Promise.all([
      queryClient.invalidateQueries(["accounts"]),
      queryClient.invalidateQueries(["account", res.code]),
    ]);

    toast.success("Informações atualizadas com sucesso!");

    router.push("/finance/accounts/");
  }

  return {
    form: {
      control,
      register,
      updateAccounts,
      handleSubmit,
    },
  };
}

export default function Edit({ params }: EditProps) {
  const { code } = params;

  const { data: account, isLoading: loadingAccount } = useAccounts().useFindByCode(code);

  const {
    form: { register, handleSubmit, updateAccounts },
  } = useEdit(account);

  if (loadingAccount) return;

  return (
    <form
      onSubmit={handleSubmit(updateAccounts)}
      className="flex flex-col gap-4"
    >
      <section className="flex flex-col gap-2">
        <input
          {...register("name")}
          defaultValue={account?.name || ""}
          className="p-3 bg-zinc-50 shadow rounded dark:bg-zinc-800 focus:shadow-xl font-semibold opacity-90 outline-none"
        />
        <textarea
          {...register("description")}
          className="p-3 bg-zinc-50 h-[10rem] rounded dark:bg-zinc-800 shadow focus:shadow-xl font-semibold opacity-90 outline-none"
          defaultValue={account?.description || ""}
        />
      </section>
      <footer className="flex">
        <button className="bg-zinc-200 rounded-md p-3 px-5 font-semibold dark:bg-zinc-800 text-lg opacity-70 hover:bg-blue-500 hover:text-white">
          Salvar
        </button>
      </footer>
    </form>
  );
}
