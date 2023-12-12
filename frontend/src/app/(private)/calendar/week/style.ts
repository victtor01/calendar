"use client";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.secundary};
`;

export const ThemeComponent = styled(motion.div)`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.secundary},
    transparent
  );
`;

export const ContainerClient = styled(motion.button)`
  /* background: ${({ theme }) => theme.primary}; */
  position: relative;
    
  &::before {
    opacity: 0.8;
    content: "";
    width: 99%;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -100%);
    height: 0.2rem;
    border-radius: 0.3rem 0.3rem 0 0;
    background: linear-gradient(45deg, #6157ff, #74febd);
  }
`;

export const PhotoClient = styled.div`
  border: 1px solid ${({theme}) => theme.primary};
`