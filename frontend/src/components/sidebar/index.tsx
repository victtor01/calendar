import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from './style';

interface sidebarProps extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
}

export function Sidebar({children, ...props}: sidebarProps) {
    const { className, ...rest } = props;

    return (
        <S.Sidebar {...rest} className={twMerge('', className)}>
            {children}
        </S.Sidebar>
    )
}