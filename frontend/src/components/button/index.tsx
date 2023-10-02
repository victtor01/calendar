
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from 'tailwind-merge';

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

export default function Button({children, ...rest}: buttonProps) {
    return <button {...rest} className={twMerge("py-2 px-3 opacity-90 hover:opacity-100", rest.className)}>{children}</button>
}