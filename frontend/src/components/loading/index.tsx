'use client'
import { HTMLAttributes } from "react";
import * as S from "./style";

export default function Loading({...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <S.Loading>
      <S.EllipsisItem {...props}/>
      <S.EllipsisItem {...props}/>
      <S.EllipsisItem {...props}/>
      <S.EllipsisItem {...props}/>
    </S.Loading>
  );
}
