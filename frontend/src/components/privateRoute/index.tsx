"use client";
import { refreshToken } from "@/hooks/apiPrivate";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function usePrivateRoutes() {
  const [logged, setLogged] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.push('/login')
  }

  const verify = useCallback(async () => {
    const res = await refreshToken();
    console.log(res);
    setLogged(res?.access_token);
    setLoading(false)
  }, []);

  useEffect(() => {
    verify();
  }, []);

  return {
    logged,
    logout,
    loading,
  };
}

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logged, logout, loading} = usePrivateRoutes();

  if(loading) {
    return null
  }

  if(!logged) {
    return (
      <button onClick={logout}>
        FAÇA O LOGIN
      </button>
    )
  }

  return (
    <>
      {children}
      {logged}
    </>
  );
}
