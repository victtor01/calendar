
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from './style';

interface headerDivisionProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
  bgTheme?: boolean;
}

export const HeaderDivision = ({ children, bgTheme = true, ...rest}: headerDivisionProps) => {
  return <S.Division $bgTheme={bgTheme} className={twMerge("flex gap-3 flex-1 items-center justify-center", rest.className)}>{children}</S.Division>;
};
