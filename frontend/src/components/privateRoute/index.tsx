"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Query, useQuery } from "@tanstack/react-query";
export interface PrivateRouteProps {
  name: string;
}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isError, isLoading, data, logout } = usePrivateRoutes();

  if (isLoading) return null;

  if (isError || !data) {
    return <><button onClick={logout}>Faça o login</button></>;
  }

  return children;
}

function usePrivateRoutes() {
  const { push } = useRouter();
  const api = useApiPrivate();

  const getUserInfo = async () => {
    return (await api.get("/users/find")).data;
  };

  const logout = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    push("/login");
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  return {
    isError,
    isLoading,
    data,
    logout,
  };
}
