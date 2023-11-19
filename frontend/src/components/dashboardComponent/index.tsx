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
  return (
    <S.Container
      key={""}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      {...props}
      className={twMerge(
        "flex flex-1 rounded flex-col relative",
        props.className
      )}
    >
      {children}
    </S.Container>
  );
}
