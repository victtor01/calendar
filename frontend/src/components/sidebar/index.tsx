import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import * as S from './style';

interface sidebarProps extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode;
    bgTheme?: boolean;
}

export function Sidebar({children, bgTheme = false, ...props}: sidebarProps) {
    const { className, ...rest } = props;

    return (
        <S.Sidebar $bgTheme={bgTheme} {...rest} className={twMerge('', className)}>
            {children}
        </S.Sidebar>
    )
}