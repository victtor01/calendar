import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from "./style";

interface DarhboardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DashboardComponent({
  children,
  ...props
}: DarhboardProps) {
  return (
    <S.Container
      className={twMerge(
        "flex flex-1 rounded-md shadow-md flex-col relative",
        props.className
      )}
    >
      {children}
    </S.Container>
  );
}
