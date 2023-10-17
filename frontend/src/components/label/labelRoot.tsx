import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from './style';

interface labelRootpProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function labelRoot({ children, ...rest }: labelRootpProps) {
  return (
    <S.Root
      className={twMerge("flex flex-col w-full gap-2 mt-10", rest.className)}
    >
      {children}
    </S.Root>
  );
}
