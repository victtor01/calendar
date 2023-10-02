'use client'
import styled from 'styled-components'

interface formProps {
    bg?: string
}

export const Form = styled.form<formProps>`
    display: flex;
    flex-direction: column;
`