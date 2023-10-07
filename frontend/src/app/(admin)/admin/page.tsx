"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    router.push("/login");
  };
  
  return (
    <>
      <button onClick={logout}>sair</button>
    </>
  );
}
