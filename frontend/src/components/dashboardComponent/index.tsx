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
        "flex flex-1 bg-white dark:bg-neutral-800 dark:bg-opacity-50 flex-col relative dark:border-none border p-1 ",
        className
      )}
    >
      {children}
    </S.Container>
  );
}
