import React, { ReactNode, FormHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from "./style";

interface formProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  bgTheme?: boolean;
}

export default function Form({ children, ...rest }: formProps) {
  return (
    <S.Form
      {...rest}
      className={twMerge(
        "p-5 w-full mx-auto min-h-auto flex items-center flex-col gap-4",
        rest.className
      )}
    >
      {children}
    </S.Form>
  );
}
