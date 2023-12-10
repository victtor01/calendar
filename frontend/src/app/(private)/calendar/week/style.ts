"use client";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.secundary};
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.secundary};
`;

export const ThemeComponent = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
`;
