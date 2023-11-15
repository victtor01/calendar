"use client";
import styled from "styled-components";

interface ContainerProps {
  $bgTheme?: boolean;
}

export const Container = styled.header<ContainerProps>`
  ${(props) =>
    props.$bgTheme === true &&
    `
      background-color: ${props.theme.secundary};
      border-bottom: 1px solid ${props.theme.border};
  `}
  display: flex;
  align-items: center;
  min-width: auto;
  width: auto;
  grid-area: header;
  z-index: 5;
  left: 0;
  top: 0;
  grid-area: header;
`;

export const Division = styled.div<ContainerProps>`
  ${(props) =>
    props.$bgTheme === true &&
    `
      background-color: ${props.theme.secundary};
  `}
`;
