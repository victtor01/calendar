'use client'
import styled from 'styled-components';

export const Container = styled.header`
    background-color: ${({theme}) => theme.secundary};
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
`