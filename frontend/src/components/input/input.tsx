'use client'
import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from 'react-hook-form'
import * as S from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  register?: UseFormRegisterReturn;
}

export default function Input({ children, register, ...rest }: InputProps) {
  return (
    <S.Input>
      <input {...rest} {...register} />
      {children}
    </S.Input>
  );
}
