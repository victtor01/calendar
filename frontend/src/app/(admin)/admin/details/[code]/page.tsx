"use client";

import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { User, UserStatus } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface DetailsProps {
  params: {
    code: string;
  };
}

function useDetails(id: number) {
  const api = useApiPrivate();

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["users", id],
    queryFn: async (): Promise<User> => {
      return (await api.get(`/users/find-by-id/${id}`)).data;
    },
  });

  async function updateStatus() {
    if (!user) return;
    const status: UserStatus = "APPROVED";
    const res = await api.patch(`/users/update-status/${user.id}`, {
      status,
    });
    console.log(res)
  }

  return {
    user,
    loadingUser,
    updateStatus,
  };
}

export default function Details({ params: { code } }: DetailsProps) {
  const { user, loadingUser, updateStatus } = useDetails(+code);
  if (loadingUser) return <Loading className="bg-cyan-500" />;
  return (
    <div className="mx-auto flex flex-col max-w-[20rem] w-full gap-4 mt-4">
      <div className="bg-zinc-400 p-2 bg-opacity-5 flex-col flex">
        <div className="flex flex-col">
          <span className="">Nome</span>
          {user?.firstName}
        </div>
        <div className="flex flex-col">
          <span>Status:</span>
          {user?.status}
        </div>
      </div>
      <footer className="flex gap-2">
        <button className="bg-rose-600 p-3 text-white rounded">
          Desativar
        </button>
        <button
          onClick={updateStatus}
          className="bg-emerald-500 p-3 text-white rounded"
        >
          Aprovar
        </button>
      </footer>
    </div>
  );
}
