"use client";
import styled from "styled-components";

export const Container = styled.header`
  background-color: ${({ theme }) => theme.secundary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  width: max-content;
  grid-area: header;
  position: sticky;
  z-index: 10;
  left: 0;
  top: 0;
`;
