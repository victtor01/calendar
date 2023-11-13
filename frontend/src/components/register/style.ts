'use client'
import styled from "styled-components";
import { motion } from "framer-motion";

export const Root = styled(motion.div)`
    background-color: ${({theme}) => theme.secundary};
    color: ${({theme}) => theme.text};
    z-index: 4;

`