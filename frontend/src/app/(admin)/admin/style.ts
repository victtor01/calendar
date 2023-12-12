"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  grid-gap: 0rem;
  height: 100vh;
  color: ${(props) => props.theme.text};
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  min-width: auto;
  overflow: auto;

  ${({ theme }) => css`
    & > .scrollable {
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
      }

      ::-webkit-scrollbar-thumb:hover {
        opacity: 0;
      }

      ::-webkit-scrollbar-track {
        background-color: ${theme.secundary};
      }
    }
  `}
`;

export const SectionActions = styled.div`
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  /* Estilo para o indicador da barra de rolagem (thumb) */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0); /* Cor de fundo da barra de rolagem */
    display: none;
  }

  /* Estilo para o indicador da barra de rolagem quando passa o mouse */
  &::-webkit-scrollbar-thumb:hover {
    opacity: 0;
    display: none;
    /* Cor de fundo da barra de rolagem quando passa o mouse */
  }

  /* Estilo para a barra de rolagem (track) */
  &::-webkit-scrollbar-track {
    display: none;
    background-color: ${({ theme }) =>
      theme.secundary}; /* Cor de fundo da área da barra de rolagem */
  }
`;

export const Content = styled.div`
  display: flex;
  grid-area: content;
  flex-direction: column;
  position: relative;
  height: auto;
  min-width: auto;
  width: auto;
  flex: 1;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.secundary};
  color: ${({ theme }) => theme.text};
`;

export const Banner = styled.div`
  position: fixed;
  height: 15rem;
  width: 100%;
  opacity: 0.1;
  filter: blur(2px) saturate(4);
`;

export const Bubble = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  height: 100%;
  min-height: fit-content;
  position: fixed;
  z-index: 4;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  &::before {
    content: "";
    width: 40%;
    height: 40%;
    position: absolute;
    top: -10%;
    left: -5%;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61%;
    filter: blur(2rem);
    opacity: 0.2;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }

  &::after {
    content: "";
    width: 30%;
    height: 30%;
    position: absolute;
    top: -10%;
    right: -10%;
    padding: 2rem;
    border-radius: 77% 23% 17% 83% / 35% 61% 39% 65%;
    filter: blur(1.7em);
    opacity: 0.2;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }
`;

export const ActionsComponents = styled(motion.button)`
  background-color: ${({ theme }) => theme.secundary};
`;

export const UserComponent = styled(motion.button)`
  background-color: ${({theme}) => theme.secundary};
`