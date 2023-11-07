"use client";

import styled from "styled-components";

export const Container = styled.main`
 /*  display: grid;
  grid-template-areas:
    "header header header header"
    "content content content content"
    "footer footer footer footer";
  grid-template-rows: auto 1fr auto; 
  grid-template-columns: 1fr 1fr 1fr 1fr; */
  /* grid-gap: 0rem; */
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.text};
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  grid-area: content;
  flex-direction: column;
  height: auto;
  min-height: auto;
  position: relative;
  flex: 1;
  min-height: 50rem;
`;
