"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.main`
  background-color: ${({ theme }) => theme.primary};
`;

export const Bubble = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: visible;
  top: 0;
  left: 0;
  pointer-events: none;

  &::before {
    content: "";
    width: 10rem;
    height: 10rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(-50%);
    padding: 2rem;
    border-radius: 77% 23% 50% 50% / 63% 38% 62% 37% ;
    backdrop-filter: blur(20px);
    filter: blur(1em);
    opacity: 0.2;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }
`;


export const Form = styled(motion.form)`
  background-color: ${({ theme }) => theme.secundary};
`;

