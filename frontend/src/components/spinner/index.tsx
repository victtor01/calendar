"use client";

import { HTMLAttributes } from "react";
import * as S from "./style";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export default function Spinner({ ...props }: SpinnerProps) {
  const { className, ...rest } = props;
  return <S.Loader className={twMerge("w-[2rem] h-[2rem]", className)} />;
}
