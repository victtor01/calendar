"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-areas:
    "sidebar header header header"
    "sidebar content content content"
    "sidebar content content content";
  grid-template-rows: auto 1fr 1fr;
  grid-template-columns: auto 1fr 1fr auto;
  grid-gap: 0rem;
  height: 100vh;
  color: ${(props) => props.theme.text};
  position: relative;
  min-width: auto;
  overflow: hidden;
  background-color: ${(props) => props.theme.primary};
`;


export const Content = styled.div`
  display: flex;
  grid-area: content;

  height: 100%;
  position: relative;
  min-width: auto;
  overflow: auto;
  width: auto;

  &::-webkit-scrollbar {
    width: 12px; /* Largura da barra de rolagem */
  }

  /* Estilo para o indicador da barra de rolagem (thumb) */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Cor de fundo da barra de rolagem */
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

export const Bubble = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  height: 100%;
  min-height: fit-content;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &::before {
    content: "";
    width: 100%;
    height: 20%;
    position: absolute;
    top: 0;
    padding: 2rem;
    border-radius: 77% 23% 77% 23% / 39% 25% 75% 61% ;
    filter: blur(2em);
    opacity: 0.1;
    background: linear-gradient(34deg, transparent, #6157FF, #74FEBD, transparent);
  }

  &::after {
    content: "";
    width: 100%;
    height: 40%;
    position: absolute;
    top: 40%;
    right: 0;
    padding: 2rem;
    border-radius:  77% 23% 17% 83% / 35% 61% 39% 65% ;
    filter: blur(2em) ;
    opacity: 0.1;
    background: linear-gradient(34deg, transparent, #6157FF, #74FEBD, transparent);
  }
`;

export const LinkRoute = styled(motion(Link))`

`
