"use client";

import PrivateRoute from "@/components/privateRoute";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Loading from "@/components/loading";
import { Theme, ToastContainer } from "react-toastify";
import { SidebarRelative } from "./sidebar-main";
import { ThemeContext } from "@/contexts/themeContext";
import Information from "@/components/layoutPrivate/informations";
import { SidebarAbsolute } from "./sidebar-absolute";
import * as S from "./style";
import { HeaderPrivate } from "./private-header";

/* #1f1d2b */
/*  rgb(24, 24, 27) */

const darkTheme = {
  primary: "rgb(9, 9, 11)",
  secundary: "rgb(24, 24, 27, 1)",
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
  primary: "#F5F9FC",
  secundary: "#fff",
  shadow: "#f6f6f6",
  text: "#000",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  border: "rgba(0,0,0,0.1)",
};

const useLayout = () => {
  const [theme, setTheme] = useState<string>("dark");

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (theme === "dark") {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }
    }
  }, [theme]);

  const currentPath = usePathname().split("/")[1];

  return {
    theme: { theme, handleTheme },
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    theme: { theme, handleTheme },
  } = useLayout();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <ThemeContext.Provider value={{ theme, handleTheme }}>
          <S.Container className="bg-gradient-45 from-purple-50 to-blue-50 dark:from-black dark:to-black">

            <SidebarRelative />

            <SidebarAbsolute />

            <HeaderPrivate />

            <Suspense fallback={<Loading />}>
              <S.Content className="bg-transparent p-4 max-w-[100rem]  w-full mx-auto">
                {/*    <UserComponents /> */}
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover
                  theme={theme.toLowerCase() as Theme}
                />
                {children}
              </S.Content>
            </Suspense>

            <Information />
          </S.Container>
        </ThemeContext.Provider>
      </ThemeProvider>
    </PrivateRoute>
  );
}
