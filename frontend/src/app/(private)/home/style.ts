"use client";

import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  width: 100%;
  max-width: 80rem;
  height: auto;
  margin: 3% auto;
  display: flex;
  flex-direction: column;
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
    top: ${props => props.$top || 0};
    left: ${props => props.$left || 0};
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(2em) brightness(80%);
    opacity: 0.1;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }

/*   &::after {
    content: "";
    width: 150%;
    height: 70%;
    position: absolute;
    top: 40%;
    right: 0;
    padding: 2rem;
    border-radius: 77% 23% 17% 83% / 35% 61% 39% 65%;
    filter: blur(50px);
    opacity: 0.2;
    background: linear-gradient(34deg, #6157ff, #74febd);
  } */
`;
