import { BiSolidPencil } from "react-icons/bi";
import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import * as S from "./style";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { HTMLMotionProps } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const variants = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

interface compartimentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Compartiment = ({ children, ...props }: compartimentProps) => {
  return (
    <div
      className={twMerge(
        `flex flex-col gap-1 flex flex-1 w-auto`,
        props.className
      )}
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
  return (
    <div
      className={twMerge(
        "flex text-lg break-words overflow-hidden ",
        props.className
      )}
    >
      {children}
    </div>
  );
};

const RegisterRoot = ({ children, ...props }: compartimentProps) => {
  const { className, ...rest } = props;
  return (
    <S.Root
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      {...rest}
      className={twMerge(
        "shadow hover:shadow-lg opacity-90 hover:opacity-100 items-center rounded-xl gap-4 flex w-full p-4 bg-zinc-800 text-white",
        className
      )}
    >
      {children}
    </S.Root>
  );
};

const ButtonTrash = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="hover:text-rose-500 opacity-70 flex hover:opacity-100  h-7 w-7 justify-center items-center rounded gap-1 flex"
    >
      <FaTrash size="18" />
      {children}
    </button>
  );
};

const ButtonEdit = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="hover:text-cyan-500 opacity-70 hover:opacity-100 h-7 w-7 justify-center items-center rounded flex flex-col gap-1 flex"
    >
      <BsFillPenFill size="18" />
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
