"use client";

import styled from "styled-components";

export const Bubble = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  top: 0;
  left: 0;

  &::before {
    content: "";
    width: 100%;
    height: 20%;
    position: absolute;
    top: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    backdrop-filter: blur(20px);
    filter: blur(30px);
    opacity: 0.2;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }

  &::after {
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
  }
`;
