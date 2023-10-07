'use client'
import styled from "styled-components";

export const Container = styled.main`
  display: flex;
/*   grid-template-areas:
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content";
  grid-template-rows: auto auto auto;
  grid-template-columns: auto 1fr 1fr 1fr; */
  grid-gap: 0rem;
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
