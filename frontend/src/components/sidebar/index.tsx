
import { twMerge } from "tailwind-merge";
import * as S from './style';
import { HTMLMotionProps } from "framer-motion";

interface sidebarProps extends HTMLMotionProps<"div">{
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