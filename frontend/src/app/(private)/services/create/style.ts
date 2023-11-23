"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Form = styled(motion.form)`
  background-color: ${({ theme }) => theme.secundary};
`;
