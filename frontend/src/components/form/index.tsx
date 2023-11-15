'use client'
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import * as S from "./style";
import { HTMLMotionProps } from "framer-motion";

interface formProps extends HTMLMotionProps<"form"> {
  children: ReactNode;
  bgTheme?: boolean | undefined;
}

export default function Form({ children, bgTheme, ...rest }: formProps) {
  return (
    <S.Form
      {...rest}
      $bgTheme={bgTheme}
      className={twMerge(
        "p-5 w-full mx-auto min-h-auto flex items-center flex-col gap-4",
        rest.className
      )}
    >
      {children}
    </S.Form>
  );
}
