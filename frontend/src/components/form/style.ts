'use client'
import styled from 'styled-components'

interface formProps {
    $bgTheme?: boolean | undefined
}

export const Form = styled.form<formProps>`
    display: flex;
    flex-direction: column;
    ${props => props.$bgTheme && `
        background: ${props.theme.secundary}
    `}
`