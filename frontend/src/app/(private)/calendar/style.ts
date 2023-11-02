'use client'
import styled from "styled-components"
import { motion } from "framer-motion"

export const Content = styled(motion.main)`
    background-color: ${({theme}) => theme.secundary};
`
export const Header = styled.header`
    background: ${({theme}) => theme.secundary};
`