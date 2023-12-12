"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import Empty from "../empty";
import Loading from "../loading";
import { SessionContext } from "@/contexts/sessionContext";
import { motion } from "framer-motion";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function useAdminRouter() {
  const api = useApiPrivate();
  const { push } = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      return (await api.get("/users/find")).data;
    },
  });

  return {
    user,
    isLoading,
  };
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAdminRouter();

  const { setUserInfo, logout } = useContext(SessionContext);
  
  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, setUserInfo]);

  if (isLoading)
    return (
      <div className="h-screen w-full bg-zinc-800 flex justify-center items-center">
        <Loading className="bg-cyan-400" />
      </div>
    );

  if (!user) {
    return (
      <div className="w-full h-screen items-center justify-center flex bg-zinc-900">
      <div className="flex flex-col gap-2 w-full max-w-[20rem] justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold">Sessão expirada</h1>
          <h2 className="text-lg">Faça o login novamente para continuar usando o sistema</h2>
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
    )
  };

  if (user.role === "USER") return <Empty />;

  return children;
}
