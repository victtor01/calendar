'use client'
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.main`
    background-color: ${({theme}) => theme.secundary};
    border: 1px solid ${({theme}) => theme.border};
`