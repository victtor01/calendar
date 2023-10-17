'use client'

import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  grid-gap: 0rem;
  height: 100vh;
  color: ${props => props.theme.text};
  position: relative;
  min-width: auto;
  overflow: auto;
`;

export const Content = styled.div`
   background-color: ${({ theme }) => theme.primary};
  display: flex;
  grid-area: content;
  flex-direction: column;
  position: relative;
  height: auto;
  min-width: auto;
  width: auto;
  flex: 1;
`;
