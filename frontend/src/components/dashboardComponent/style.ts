"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  background-color: ${({ theme }) => theme.secundary};
  flex-basis: 15rem;
  /* border: 1px solid ${({ theme }) => theme.border};  */
  z-index: 2;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 0.5rem; /* Largura da barra de rolagem */
  }

  /* Estilo para o indicador da barra de rolagem (thumb) */
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to top,
      rgba(97, 87, 255, 0.3),
      rgba(116, 254, 189, 0.3)
    );

    border-radius: 0.1rem;
  }

  /* Estilo para o indicador da barra de rolagem quando passa o mouse */
  &::-webkit-scrollbar-thumb:hover {
    opacity: 1; /* Cor de fundo da barra de rolagem quando passa o mouse */
  }

  /* Estilo para a barra de rolagem (track) */
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) =>
      theme.secundary}; /* Cor de fundo da área da barra de rolagem */
  }
`;
