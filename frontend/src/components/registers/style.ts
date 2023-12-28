'use client'

import { motion } from "framer-motion";
import styled from "styled-components";

export const ContainerRegisters = styled(motion.div)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 4px;
    left: -4px;
    top: 0;
    border-radius: 2px 0 0 2px;
    opacity: 0.5;
    background-color: #6157ff;
  }
`;
