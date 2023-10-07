'use client'
import useApiPrivate from "@/hooks/apiPrivate";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export interface  PrivateRouteProps {
  name: string
}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { logged, loading, logout } = usePrivateRoutes();

  if (loading) return null;

  if (!logged) {
    return <button onClick={logout}>Faça o login</button>;
  }

  return children;
}

function usePrivateRoutes() {
  const [logged, setLogged] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const api = useApiPrivate();

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    router.push("/login");
  };

  const verify = useCallback(async () => {
    try {
      const { data } = await api.get("/users/find");
      console.log(data);
      setRole(data.role);
      setLogged(true);
    } catch (error) {
      console.log(error);
      setLogged(false);
    } finally {
      setLoading(false);
    }
  }, [setRole, setLogged]);

  useEffect(() => {
    verify();
  }, [verify]);

  return {
    logged,
    loading,
    role,
    logout,
  };
}
