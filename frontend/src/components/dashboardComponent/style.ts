'use client'

import { motion } from "framer-motion"
import styled from "styled-components"

export const Container = styled(motion.div)`
    background-color: ${({theme}) => theme.secundary};
    flex-basis: 15rem;
    border: 1px solid ${({theme}) => theme.border};
    z-index: 2;
    cursor: pointer;
`
