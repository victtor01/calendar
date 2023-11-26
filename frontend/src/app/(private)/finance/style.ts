'use client'

import { motion } from "framer-motion"
import styled from "styled-components"
import Link from "next/link"

export const Form = styled.div`
    background-color: ${({ theme }) => theme.secundary};
`

export const Links = styled.div`
    background-color:  ${({ theme }) => theme.secundary};
`
export const Container = styled(motion.div)`
    background-color: ${({ theme }) => theme.secundary};
`

export const Registers = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;

export const LinkTheme = styled(Link)`
    background-color: ${(({theme}) => theme.secundary)};
`


export const Bubble = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  height: 100%;
  min-height: fit-content;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61% ;
    filter: blur(2em);
    opacity: 0.2;
    background: linear-gradient(34deg, transparent, #6157FF, #74FEBD, transparent);
  }
`;