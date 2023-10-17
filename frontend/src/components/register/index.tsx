import { BiSolidPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import * as S from "./style";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface compartimentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Compartiment = ({ children, ...props }: compartimentProps) => {
  return (
    <div
      className={twMerge(`flex flex-col gap-1 flex flex-1`, props.className)}
    >
      {children}
    </div>
  );
};

const CompartimentTitle = ({ children, ...props }: compartimentProps) => {
  return (
    <div className="flex text-sm opacity-80 font-semibold">{children}</div>
  );
};

const CompartimentContent = ({ children, ...props }: compartimentProps) => {
  return <div className={twMerge("flex text-lg", props.className)}>{children}</div>;
};

const RegisterRoot = ({ children, ...props }: compartimentProps) => {
  return (
    <S.Root className="shadow hover:shadow-xl opacity-90 hover:opacity-100 items-center rounded-2xl gap-4 flex flex-wrap w-full p-4 bg-zinc-800 text-white roudned">
      {children}
    </S.Root>
  );
};

const ButtonTrash = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="opacity-90 flex hover:opacity-100 px-3 h-10 w-10 justify-center items-center bg-red-400 rounded gap-1 flex"
    >
      <BsFillTrashFill />
      {children}
    </button>
  );
};

const ButtonEdit = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="opacity-90 hover:opacity-100 h-10 w-10 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded flex flex-col gap-1"
    >
      <BiSolidPencil />
      {children}
    </button>
  );
};

export default {
  Root: RegisterRoot,
  Compartiment: Compartiment,
  Title: CompartimentTitle,
  Content: CompartimentContent,
  ButtonTrash,
  ButtonEdit,
};
