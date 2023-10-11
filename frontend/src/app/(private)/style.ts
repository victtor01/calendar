'use client'
import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-areas:
    "sidebar header header header"
    "sidebar content content content"
    "sidebar content content content";
  grid-template-rows: auto 1fr 1fr;
  grid-template-columns: auto 1fr 1fr auto;
  grid-gap: 0rem;
  min-height: 100vh;
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
  height: auto;
  min-width: auto;
  overflow: auto;
  width: auto;
`;