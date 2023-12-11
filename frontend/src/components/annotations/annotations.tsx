'use client'

import * as S from './style';

export default function Annotations() {
  return (
    <S.Annotations className="flex m-1 rounded flex-col relative p-3 w-full max-w-[15rem] mx-auto flex hover:shadow-xl transition-shadow">
      <S.Bubble />
      <header className="flex items-center gap-3 justify-between">
        Anotações
      </header>
    </S.Annotations>
  );
}
