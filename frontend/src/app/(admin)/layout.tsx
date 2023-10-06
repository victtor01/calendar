"use client";
import PrivateRoute from "@/components/privateRoute";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useLayout = () => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/login");
  };
  
  return {
    logout,
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useLayout();

  return (
    <PrivateRoute>
      {children}
      <button onClick={logout}>SAIR</button>
    </PrivateRoute>
  );
}
