import { motion } from "framer-motion";
import styled from "styled-components";

interface SidebarProps {
  $bgTheme: boolean;
}

export const Sidebar = styled(motion.div)<SidebarProps>`

  ${props => props.$bgTheme && `
    background-color: ${props.theme.secundary};
  `}

  &::-webkit-scrollbar {
    width: 12px; /* Largura da barra de rolagem */
  }

  /* Estilo para o indicador da barra de rolagem (thumb) */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2); /* Cor de fundo da barra de rolagem */

  }

  /* Estilo para o indicador da barra de rolagem quando passa o mouse */
  &::-webkit-scrollbar-thumb:hover {
    opacity: 1; /* Cor de fundo da barra de rolagem quando passa o mouse */
  }

  /* Estilo para a barra de rolagem (track) */
  &::-webkit-scrollbar-track {
    background-color: transparent; /* Cor de fundo da área da barra de rolagem */
  }

  /* Estilo para a barra de rolagem (track) quando passa o mouse */
`;
