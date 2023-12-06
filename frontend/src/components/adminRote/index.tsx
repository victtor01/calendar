"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import Empty from "../empty";
import Loading from "../loading";
import { SessionContext } from "@/contexts/sessionContext";

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

  const { setUserInfo } = useContext(SessionContext);
  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  if (isLoading) return <Loading className="bg-cyan-400" />;
  if (!user) return <Empty />;
  if (user.role === "USER") return <Empty />;

  return children;
}
