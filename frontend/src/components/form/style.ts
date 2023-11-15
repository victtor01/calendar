'use client'
import { motion } from 'framer-motion'
import styled from 'styled-components'

interface formProps {
    $bgTheme?: boolean | undefined
}

export const Form = styled(motion.form)<formProps>`
    display: flex;
    flex-direction: column;
    ${props => props.$bgTheme && `
        background: ${props.theme.secundary}
    `}
`