"use client";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.main`
/*   background-color: ${({ theme }) => theme.secundary}; */
`;

export const Bubble = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(2em) brightness(80%);
    opacity: 0.1;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }
`;

export const Modal = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;

  &::before {
    content: "";
    width: 99%;
    position: absolute;
    background-color: red;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    height: 0.4rem;
    border-radius: 0.3rem 0.3rem 0 0;
    background: linear-gradient(45deg, #6157ff, #74febd);
  }
`;

export const Separator = styled.span`
  width: 100%;
  background: linear-gradient(45deg, transparent, #6157ff, transparent);
  height: 1px;
  display: flex;
`;

export const ComponentForm = styled(motion.form)`
  //background: linear-gradient(to bottom, ${({theme}) => theme.secundary}, transparent);
  position: relative;

/*   &::before {
    content: "";
    width: 98%;
    position: absolute;
    background-color: red;
    top: 0;
    left: 50%;
    opacity: 0.9;
    transform: translate(-50%, -100%);
    height: 0.3rem;
    border-radius: 0.3rem 0.3rem 0 0;
    background: linear-gradient(45deg, #6157ff, #74febd);
  } */
`

export const ComponentTheme = styled(motion.div)`
  background-color: ${({theme}) => theme.secundary};
`