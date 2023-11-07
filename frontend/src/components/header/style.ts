"use client";
import styled from "styled-components";

interface ContainerProps {
  bgTheme?: boolean;
}

export const Container = styled.header`
  background-color: ${({ theme }) => theme.secundary};
  display: flex;
  align-items: center;
  min-width: 100%;
  width: max-content;
  grid-area: header;
  position: sticky;
  z-index: 50;
  left: 0;
  top: 0;
`;
