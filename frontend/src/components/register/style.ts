'use client'
import styled from "styled-components";
import { motion } from "framer-motion";

export const Root = styled(motion.div)`
    color: ${({theme}) => theme.text};
    z-index: 4;

`