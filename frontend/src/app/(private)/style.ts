'use client'
import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-areas:
    "sidebar header header header"
    "sidebar content content content"
    "sidebar content content content";
  grid-template-rows: auto 1fr 1fr;
  grid-template-columns: auto 1fr 1fr auto;
  grid-gap: 0rem;
  min-height: 100vh;
  color: ${props => props.theme.text};
  position: relative;
  min-width: auto;
  overflow: hidden;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  grid-area: content;
  flex-direction: column;
  height: auto;
  position: relative;
  height: 100vh;
  min-width: auto;
  overflow: auto;
  width: auto;

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

`;