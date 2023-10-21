"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function useAdminRouter() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>("");
  const api = useApiPrivate();
  const { push } = useRouter();

  const valide = useCallback(async () => {
    try {
      const { data } = await api.get("/users/find");
      const { role } = data;

      if(role === 'USER') {
        push('/home')
      }

      setRole(role);
    } catch (error) {
      setRole(null);
      push('/login')
    } finally {
      setLoading(false);
    }
  }, [api, push, setRole, setLoading]);

  useEffect(() => {
    valide();
  }, [valide]);

  return {
    role,
    loading,
  };
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { role, loading } = useAdminRouter();

  if (loading) return;

  if (role === "USER" || !role) {
    return <>SEM PERMISSÃO</>;
  }

  return children;
}
