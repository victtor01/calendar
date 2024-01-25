import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from "./style";
import { HTMLMotionProps } from "framer-motion";

interface DarhboardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function DashboardComponent({
  children,
  ...props
}: DarhboardProps) {
  const { className, ...rest } = props;
  return (
    <S.Container
      {...rest}
      className={twMerge(
        "flex flex-1 rounded-xl bg-white dark:bg-zinc-900 dark:bg-opacity-50 flex-col relative dark:border-none border",
        className
      )}
    >
      {children}
    </S.Container>
  );
}
