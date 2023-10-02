"use client";

import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-areas:
    "header header header header"
    "content content content content"
    "footer footer footer footer";
  grid-template-rows: auto 1fr auto; /* Ajuste as alturas conforme necessário */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0rem;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  color: ${props => props.theme.text};
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  grid-area: content;
  flex-direction: column;
  height: auto;
  flex: 1;
`;
