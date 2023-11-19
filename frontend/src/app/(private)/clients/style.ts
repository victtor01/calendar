"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

interface ClientPhotoProps {
  $src?: string;
}

export const ClientPhoto = styled(motion.section)<ClientPhotoProps>`
  position: relative;

  background-color: #eee; /* Cor de fundo de fallback */
  transition: background-size 0.3s ease; /* Adiciona uma transição suave para a mudança de tamanho do background */

  &::before {
    content: "";
    position: absolute;
    background-image: url(${(props) => props.$src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: transform 0.3s ease;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &:hover::before {
    transform: scale(1.2);
    z-index: 2;
  }
`;

export const ClientContent = styled(motion.div)`
    background-color: ${({theme}) => theme.secundary};
`;
