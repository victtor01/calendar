import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface labelRootpProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function labelRoot({ children, ...rest }: labelRootpProps) {
  return (
    <div
      className={twMerge("flex flex-col w-full gap-2 mt-10", rest.className)}
    >
      {children}
    </div>
  );
}
