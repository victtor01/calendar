import { twMerge } from "tailwind-merge";
import * as S from "./style";

interface headerRootProps extends React.HTMLProps<HTMLElement> {
  children: React.ReactNode;
  bgTheme?: boolean
}

export const HeaderRoot = ({ children, bgTheme = true, ...props }: headerRootProps) => {
  const { className , ...rest } = props;
  return (
    <S.Container {...rest} $bgTheme={bgTheme} className={twMerge("justify-around", className)}>
      {children}
    </S.Container>
  );
};
