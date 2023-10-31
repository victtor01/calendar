'use client'
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.main)`
    background-color: ${({theme}) => theme.secundary};
`