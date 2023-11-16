"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Form = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
`;
