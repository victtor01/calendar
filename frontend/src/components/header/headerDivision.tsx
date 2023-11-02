
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface headerDivisionProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

export const HeaderDivision = ({ children, ...rest}: headerDivisionProps) => {
  return <div className={twMerge("flex gap-3 flex-1 items-center justify-center", rest.className)}>{children}</div>;
};
