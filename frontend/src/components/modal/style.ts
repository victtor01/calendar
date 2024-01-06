'use client'

import styled from "styled-components";
import { motion } from "framer-motion";

export const Modal = styled(motion.div)`
/*   background-color: ${({ theme }) => theme.secundary}; */
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