import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface labelContentProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function LabelContent({ children, ...props }: labelContentProps) {
  return (
    <label
      className={twMerge(
        "flex flex-col w-full gap-1 relative h-[100%]",
        props.className
      )}
    >
      {children}
    </label>
  );
}
