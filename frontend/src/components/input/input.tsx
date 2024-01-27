"use client";
import React, { InputHTMLAttributes } from "react";
import { UseControllerProps, UseFormRegisterReturn } from "react-hook-form";
import * as S from "./style";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  register?: UseControllerProps;
}

export default function Input({ children, register, ...rest }: InputProps) {
  const { className, ...props } = rest;
  return (
    <S.Input>
      <input
        className={twMerge("bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800", className)}
        {...props}
        {...register}
      />
      {children}
    </S.Input>
  );
}
