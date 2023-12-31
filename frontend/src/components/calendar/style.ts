"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

export const Bubble = styled.div`
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
    opacity: 0.1;
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

export const Modal = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
  /*  border: 1px solid ${({ theme }) => theme.border}; */
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
