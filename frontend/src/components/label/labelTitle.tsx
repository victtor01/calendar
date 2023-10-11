import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface labelTitleProps extends HTMLAttributes<HTMLLabelElement>{
    children: React.ReactNode
}

export function LabelTitle({ children, ...rest}: labelTitleProps) {
  return (
    <div className={twMerge("w-full text-lg font-semibold flex items-center gap-1", rest.className)}>
      {children}
    </div>
  );
}
