"use client";

import useApiPrivate from "@/hooks/apiPrivate";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { useSessionContext } from "@/contexts/sessionContext";
import { motion } from "framer-motion";

export interface PrivateRouteProps {
  name: string;
}

function usePrivateRoutes() {
  const { push } = useRouter();
  const api = useApiPrivate();

  const logout = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    push("/login");
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return (await api.get("/users/find")).data;
    },
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  });

  return {
    isError,
    isLoading,
    data,
    logout,
  };
}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isError, isLoading, data, logout } = usePrivateRoutes();
  const [loading, setLoading] = useState<boolean>(true);
  const { setUserInfo  } = useSessionContext();

  useEffect(() => {
    if (data) {
      setUserInfo({
        id: Number(data.id),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photo,
      });
    }
    setLoading(false);
  }, [data, setUserInfo, setLoading]);

  if (isLoading || loading) {
    return (
      <div className="w-full h-screen items-center bg-zinc-900 justify-center flex">
        <Loading className="bg-cyan-600" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-screen items-center justify-center flex bg-zinc-900">
        <div className="flex flex-col gap-2 w-full max-w-[20rem] justify-center items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">Sessão expirada</h1>
            <h2 className="text-lg">
              Faça o login novamente para continuar usando o sistema
            </h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className="bg-gradient-45 font-semibold from-purple-600 to-blue-500 p-2 text-lg w-full rounded opacity-70 hover:opacity-100"
          >
            Faça o login
          </motion.button>
        </div>
      </div>
    );
  }

  return children;
}

