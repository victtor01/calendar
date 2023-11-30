"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Modal = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};

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
