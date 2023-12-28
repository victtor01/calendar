"use client";

import styled from "styled-components";

export const Bubble = styled.div`
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
    top: 0;
    left: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(2em) brightness(80%);
    opacity: 0.1;
    background: linear-gradient(34deg, #6157ff, #74febd);
  }
`;

export const Separator = styled.span`
  width: 100%;
  background: linear-gradient(45deg, transparent, #6157ff, transparent);
  height: 1px;
  display: flex;
`;
