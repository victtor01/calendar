"use client";

import { styled } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

export const Separator = styled.span`
  width: 100%;
  height: 1px;
`;

interface LinkRouteProps {
  $selected: boolean;
}

export const LinkRoute = styled(motion(Link))<LinkRouteProps>`
  position: relative;

  &::before {
    content: "";
    top: 50%;
    width: 0.2rem;
    position: absolute;
    left: 0%;
    transform: translateY(-50%);
    transition: height 0.1s, opacity 0.1s;
    border-radius: 1rem;
    height: ${(props) => (props.$selected ? "90% !important" : 0)};
    opacity: ${(props) => (props.$selected ? 1 : 0)};
  }
/* 
  &:hover::before {
    height: 40%;
    opacity: 1;
  } */
`;
