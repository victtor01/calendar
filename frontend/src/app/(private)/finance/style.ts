"use client";

import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const Form = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;

export const Links = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;
export const Container = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
`;

export const Registers = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;

export const LinkTheme = styled(Link)`
  background-color: ${({ theme }) => theme.secundary};
`;

const animation = keyframes`
0% {
  left: -100%;
}
100% {
  left: 100%;
}
`;

export const BubbleBanner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;

  &::before {
    content: "";
    width: 60%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;
    border-radius: 50% 50% 66% 34% / 57% 35% 65% 43%;
    filter: blur(1rem) contrast(300%) brightness(100%);
    opacity: 0.3;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
    animation: ${animation} 15s infinite linear;
  }

  &::after {
    content: "";
    width: 60%;
    height: 200%;
    position: absolute;
    bottom: 0;
    left: -100%;
    padding: 2rem;
    border-radius: 50% 50% 66% 34% / 57% 35% 65% 43%;
    filter: blur(1rem) contrast(300%) brightness(100%);
    animation: ${animation} 15s infinite linear;
    animation-delay: 8s;
    opacity: 0.3;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }
`;

export const LinkAddRegister = styled(Link)`
  position: relative;
  transition: 2s;
  
  &:hover {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }
`;

export const Bubble = styled.div`
  width: 10rem;
  flex: 1;
  display: flex;
  height: 10rem;
  position: absolute;
  z-index: 0;
  overflow: visible;
  top: 0;
  bottom: 0;
  right: 5rem;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(1.4em);
    opacity: 0.2;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }
`;
