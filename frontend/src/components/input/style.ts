'use client'
import styled from "styled-components";

export const Input = styled.div`
  min-height: 3.5rem;
  width: 100%;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;

  & span {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    color: rgba(100, 100, 100, 1);
    align-items: center;
    text-align: center;
    display: flex;
    transition: 0.1s ease-in-out;
    font-weight: 600;
    padding: 0 0.2rem;
    height: 1px;
    z-index: 2;
    pointer-events: none;
    justify-content: center;
    background-color: ${({ theme }) => theme.primary};
  }

  & input {
    min-height: 3.5rem;
    height: 100%;
    width: 100%;
    background: transparent;
    z-index: 1;
    padding: 0rem 0.2rem 0 1rem;
    align-items: center;
    border: none;
    outline: none;
    transition: 0.2s;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    appearance: inherit;

    :focus {
      border: 1px solid ${({ theme }) => theme.darkPurple};
    }
  }

 &  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
  }

  /* Este seletor é específico para o Firefox */
 &  input[type="date"]::-moz-calendar-picker-indicator {
    display: none;
  }

  /* Este seletor é específico para o Edge */
  & input[type="date"]::-ms-clear {
    display: none;
  }

  & input:focus ~ span,
  & input:valid ~ span {
    font-size: 0.8rem;
    top: 0%;
    left: 0.5rem;
  }
`;
