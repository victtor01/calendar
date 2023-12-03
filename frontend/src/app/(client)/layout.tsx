"use client";
import { Suspense, useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
import * as S from "./style";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
//import Loading from "@/components/loading";
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
