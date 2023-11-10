'use client'

import styled from "styled-components"

export const Container = styled.div`
    background-color: ${({theme}) => theme.secundary};
    flex-basis: 15rem;
    border: 1px solid ${({theme}) => theme.border};
`
