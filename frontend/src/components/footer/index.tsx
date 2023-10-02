import { twMerge } from "tailwind-merge"
import { HTMLAttributes } from "react"
import * as S from './style';

interface footerProps extends HTMLAttributes<HTMLElement> {
 children: React.ReactNode
}

export default function Footer ({ children, ...rest }: footerProps) {
    return (
        <S.Footer className={twMerge('p-40', rest?.className)}>
            {children}
        </S.Footer>
    )
}