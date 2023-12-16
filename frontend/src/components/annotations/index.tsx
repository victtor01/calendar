"use client";

import * as S from "./style";
import { TbSubtask } from "react-icons/tb";
import { FormAnnotations } from "./form";

export function Annotations() {
  return (
    <S.Annotations className="flex m-[0.7rem] mx-[0.6rem] rounded gap-2 min-h-[15rem] flex-col relative p-3 w-full max-w-[20rem] mx-auto flex hover:shadow-xl transition-shadow">
      <S.Bubble />
      <header className="flex items-center gap-3 justify-between">
        <TbSubtask />
        <h1 className="font-semibold">Anotações</h1>
      </header>
      <section className="flex flex-col gap-2 flex-1 overflow-auto">
        <FormAnnotations />
      </section>
    </S.Annotations>
  );
}
