"use client";
import { Suspense, useState } from "react";
import Header from "@/components/header";
import { ThemeProvider } from "styled-components";
import * as S from "./style";
import Button from "@/components/button";
import Link from "next/link";
import Footer from "@/components/footer";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import Loading from "./loading";

interface layoutProps {
  children: React.ReactNode;
}

const darkTheme = {
  primary: "#121212",
  secundary: "#181717",
  text: "#ebe8e8",
  success: "#0f0",
  error: "#f00",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  darkBlue: "#3d6bcd",
  lightBlue: "#437fff",
  border: "#3e3e3e",
};

const lightTheme = {
  primary: "rgba(245,249,255,1)",
  secundary: "rgba(240,246,252,1) ",
  text: "#000",
  success: "",
  error: "",
  lightPurple: "",
  darkPurple: "",
  linearPurple: "",
  border: "#d8d3d3",
};

export default function Layout({ children }: layoutProps) {
  const [theme, setTheme] = useState<String>("dark");

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const TextTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <S.Container>

        <Header.Root className="p-3 text-xl z-20 border-b border-cyan-400 border-opacity-20">
          <Header.Division className="justify-start">
            <Button
              onClick={handleTheme}
              className="flex items-center justify-center"
            >
              <TextTheme />
            </Button>
          </Header.Division>
          <Header.Division>Logo</Header.Division>
          <Header.Division className="justify-end">
            <Link
              href={"/login"}
              className="rounded py-2 px-3 border border-cyan-500 text-lg font-semibold opacity-70 hover:opacity-100 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:border-none"
            >
              Fazer login
            </Link>
            <Link
              href={"/register"}
              className="py-3 px-4 text-xl text-[#fff] bg-gradient-to-r from-rose-500 to-fuchsia-600 opacity-90 hover:opacity-100 font-semibold transition-opacity duration-200 hover:scale-102 rounded"
            >
              Assinar
            </Link>
          </Header.Division>
        </Header.Root>
        <Suspense fallback={<Loading/>}>
          <S.Content>{children}</S.Content>
        </Suspense>
        <Footer className="border-t border-cyan-500 border-opacity-10">
          Footer
        </Footer>
      </S.Container>
    </ThemeProvider>
  );
}