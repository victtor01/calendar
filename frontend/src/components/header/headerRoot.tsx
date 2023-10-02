import * as S from './style';

interface headerRootProps extends React.HTMLProps<HTMLElement>{
    children: React.ReactNode
}

export const HeaderRoot = ({ children, ...props } : headerRootProps) => {
    return (
        <S.Container {...props}>
            { children }
        </S.Container>
    )
}