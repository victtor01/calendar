"use client";
import { Suspense, useState, createContext, useContext } from "react";
import Header from "@/components/header";
import { ThemeProvider } from "styled-components";
import * as S from "./style";
import Button from "@/components/button";
import Link from "next/link";
import Footer from "@/components/footer";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import Loading from "@/components/loading";
import { AnimatePresence } from "framer-motion";

type ThemeType = "DARK" | "LIGHT";

interface ContextProps {
  handleTheme: () => null;
  theme: ThemeType;
}

interface layoutProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ContextProps>({
  handleTheme: () => null,
  theme: "DARK",
});

const darkTheme = {
  primary: "#101010",
  secundary: "#1f1d2b",
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
  primary: "rgba(238,240,248,1) ",
  secundary: "#fff",
  text: "#000",
  success: "",
  error: "",
  lightPurple: "",
  darkPurple: "",
  linearPurple: "",
  border: "#b8b8b8",
};

export default function Layout({ children }: layoutProps) {
  const [theme, setTheme] = useState<ThemeType>("DARK");

  const handleTheme = (): null => {
    setTheme((prev) => (prev === "DARK" ? "LIGHT" : "DARK"));
    return null;
  };

  return (
    <>
      <ThemeContext.Provider value={{ handleTheme, theme }}>
        <ThemeProvider theme={theme === "DARK" ? darkTheme : lightTheme}>
          <S.Container>
            {/*  <Header.Root
            className="p-2 text-xl z-[100] top-0 w-full sticky top-0"
            bgTheme={true}
            >
            <Header.Division className="justify-start" bgTheme={false}>
            <Button
            onClick={handleTheme}
            className="flex items-center justify-center"
            >
            <TextTheme />
            </Button>
            </Header.Division>
            <Header.Division className="gap-0" bgTheme={false}>
            <Link
            href={"/login"}
            className="rounded py-3 px-2 text-lg font-semibold opacity-70 hover:opacity-100 hover:opacity-100"
            >
            Serviços
              </Link>
              <Link
              href={"/login"}
              className="rounded py-3 px-2 text-lg font-semibold opacity-70 hover:opacity-100 hover:opacity-100"
              >
              Home
              </Link>
              <Link
              href={"/login"}
              className="rounded py-3 px-2 text-lg font-semibold opacity-70 hover:opacity-100 hover:opacity-100"
              >
              Contacte-nos
              </Link>
              </Header.Division>
              <Header.Division bgTheme={false} className="justify-end">
              <Link
              href={"/login"}
              className="rounded py-3 px-4 text-lg font-semibold opacity-70 hover:opacity-100 hover:opacity-100"
              >
              Login
              </Link>
              <Link
              href={"/register"}
              className="py-3 px-4 text-lg text-[#fff] bg-gradient-45 from-purple-500 to-blue-600 opacity-90 hover:opacity-100 font-semibold transition-opacity duration-200 hover:scale-102 rounded"
              >
              Sing up
              </Link>
            </Header.Division>
          </Header.Root> */}
            <Suspense fallback={<Loading />}>
              <S.Content>
                <AnimatePresence>{children}</AnimatePresence>
              </S.Content>
            </Suspense>
            <Footer className="border-t border-cyan-500 border-opacity-10">
              Footer
            </Footer>
          </S.Container>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
