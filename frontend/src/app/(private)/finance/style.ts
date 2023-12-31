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

export const BubbleHeader = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  height: 100%;
  min-height: fit-content;
  position: absolute;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;

  &::before {
    content: "";
    width: 30%;
    height: 40%;
    position: absolute;
    top: 0;
    left: -2rem;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(4vh);
    opacity: 0.17;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }

  &::after {
    content: "";
    width: 50%;
    height: 40%;
    position: absolute;
    top: 40%;
    right: 0;
    padding: 2rem;
    border-radius: 77% 23% 17% 83% / 35% 61% 39% 65%;
    filter: blur(4vh);
    opacity: 0.15;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }
`;

export const OptionsOfPageRegisters = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
`;

interface LinkedProps {
  $selected: boolean;
}

export const Linked = styled(Link)<LinkedProps>`
  position: relative;

  &::before {
    content: "";
    background: ${({ theme }) => theme.text};
    bottom: 0;
    height: 0.2rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.3s, opacity 0.3s;
    width: ${(props) => (props.$selected ? "100% !important" : 0)};
    opacity: ${(props) => (props.$selected ? 1 : 0)};
  }

  &:hover::before {
    width: 20%;
    opacity: 1;
  }
`;
