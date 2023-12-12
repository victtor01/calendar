"use client";

import styled from "styled-components";

export const Bubble = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    width: 22rem;
    height: 22rem;
    top: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(2rem);
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
