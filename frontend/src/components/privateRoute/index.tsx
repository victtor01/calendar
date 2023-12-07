"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { useSessionContext } from "@/contexts/sessionContext";

export interface PrivateRouteProps {
  name: string;
}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isError, isLoading, data, logout } = usePrivateRoutes();
  const [loading, setLoading] = useState<boolean>(true);
  const { setUserInfo } = useSessionContext();

  useEffect(() => {
    if (data) {
      setUserInfo({
        id: Number(data.id),
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photo,
      });
    }
    setLoading(false);
  }, [data, loading]);

  
  if (isLoading) {
    return (
      <div className="w-full h-screen items-center bg-zinc-900 justify-center flex">
        <Loading className="bg-cyan-600" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-screen items-center justify-center flex">
        <button
          onClick={logout}
          className="bg-cyan-500 p-3 rounded opacity-70 hover:opacity-100"
        >
          Faça o login
        </button>
      </div>
    );
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
