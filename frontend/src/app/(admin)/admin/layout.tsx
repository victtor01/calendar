"use client";
import AdminRoute from "@/components/adminRote";
import * as S from "./style";
import Header from "@/components/header";
import { ThemeProvider } from "styled-components";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontOpenSans } from "@/app/fonts";

const darkTheme = {
  primary: "#121212",
  secundary: "#181717",
  text: "#ebe8e8",
  shadow: "#202020",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  darkBlue: "#3d6bcd",
  lightBlue: "#437fff",
  border: "#3e3e3e",
};

const lightTheme = {
  primary: "#ffffff",
  secundary: "#f9fcfe",
  shadow: "#f6f6f6",
  text: "#000",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  border: "#d8d3d3",
};

const useLayout = () => {
  const router = useRouter();
  const [theme, setTheme] = useState<string>("light");

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    router.push("/login");
  };

  return {
    theme,
    logout,
    handleTheme,
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, handleTheme, theme } = useLayout();
  return (
    <AdminRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <S.Container className={`${fontOpenSans}`}>
          <header style={{ gridArea: "header" }} className="p-4 text-zinc-900 bg-cyan-400 p-5 text-lg flex h-auto p-0 justify-between items-center">
            <div className="flex">
              Admin
            </div>
            <div className="flex gap-4">
              <button onClick={handleTheme}>
                Theme
              </button>
              <button onClick={logout}>
                Sair
              </button>
            </div>
          </header>
          <S.Content>{children}</S.Content>
        </S.Container>
      </ThemeProvider>
    </AdminRoute>
  );
}
