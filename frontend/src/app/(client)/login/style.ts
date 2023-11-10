'use client'

import styled from "styled-components";

export const Bubble = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    width: 50rem;
    height: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(160deg);
    padding: 2rem;
    border-radius: 100% 0% 96% 4% / 59% 0% 100% 41%  ;
    filter: blur(60px) contrast(400%) brightness(60%);
    opacity: 0.2;
    background: linear-gradient(34deg, #6157FF, #74FEBD);
  }

  /* &::after {
    content: "";
    width: 150%;
    height: 70%;
    position: absolute;
    top: 40%;
    right: 0;
    padding: 2rem;
    border-radius:  77% 23% 17% 83% / 35% 61% 39% 65% ;
    filter: blur(50px);
    opacity: 0.2;
    background: linear-gradient(34deg, #6157FF, #74FEBD);
  } */
`;
