"use client";

import styled from "styled-components";

interface EventsTemplatesProps {
  beforeColor?: string;
}

export const EventsTemplates = styled.div<EventsTemplatesProps>`
  position: relative;
  padding-left: 1.2rem;
  overflow: hidden;

  &:before {
    content: "";
    left: 0;
    background-color: ${props => props.beforeColor || 'cyan'};
    width: 3px;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;
