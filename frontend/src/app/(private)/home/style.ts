"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  background-color: transparent;
  width: 100%;
  max-width: 70rem;
  height: auto;
  margin: 3% auto;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
`;

export const Component = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TitleComponent = styled.div`
  width: 100%;
  padding: 0.2rem;
  justify-content: space-between;
  display: flex;
`;

interface BubbleProps {
  $top?: string;
  $left?: string;
}

export const Bubble = styled.div<BubbleProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${(props) => props.$top || 0};
    left: ${(props) => props.$left || 0};
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
`;

export const Circle = styled.circle`
  opacity: 0.3;

  stroke-dashoffset: 0;
  stroke-width: 15%;
  fill: none;
`;

export const Progress = styled(motion.circle)`
  stroke-dashoffset: 0;
  stroke-width: 15%;
  fill: none;
  stroke-linecap: round;
`;

export const ContentComponent = styled.div`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: relative;

`