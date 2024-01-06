"use client";

import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

export const Container = styled(motion.div)`
  width: 100%;
  height: auto;
  margin: auto;
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
  font-size: 1rem;
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
  pointer-events: none;

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
    opacity: 0.01;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }
`;

const animation = keyframes`
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
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

export const Circle = styled.circle`
  opacity: 0.3;

  stroke-dashoffset: 0;
  stroke-width: 10%;
  fill: none;
`;

export const Progress = styled(motion.circle)`
  stroke-dashoffset: 0;
  stroke-width: 10%;
  fill: none;
  stroke-linecap: round;
`;

export const ContentComponent = styled.div`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const ComponentRegister = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
`;

export const Theme = styled.div`
  background-color: ${({ theme }) => theme.secundary};
  color: ${({ theme }) => theme.text};
`;

export const BubbleBanner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: 0;

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
    opacity: 0.2;
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
    animation-delay: 7s;
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
