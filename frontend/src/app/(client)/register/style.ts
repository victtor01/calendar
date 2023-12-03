import styled, { keyframes } from "styled-components";

export const ImageBackground = styled.div`
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-image: url('/caledars2.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.9;
`

const animation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

export const Bubble = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    width: 60%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;
    border-radius: 50% 50% 66% 34% / 57% 35% 65% 43%;
    filter: blur(1rem) contrast(300%) brightness(100%);
    opacity: 0.1;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
    animation: ${animation} 15s infinite linear;
  }

  &::after {
    content: "";
    width: 60%;
    height: 200%;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2rem;
    border-radius: 50% 50% 66% 34% / 57% 35% 65% 43%;
    filter: blur(2rem) contrast(300%) brightness(100%);
    animation: ${animation} 15s infinite linear;
    animation-delay: 8s;
    opacity: 0.1;
    background: linear-gradient(
      34deg,
      transparent,
      #6157ff,
      #74febd,
      transparent
    );
  }
`;

export const Form = styled.form`
  background-color: ${({theme}) => theme.secundary};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0%;
    margin-top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 96%;
    height: 5px;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(45deg, #6157ff, #74febd);
  }
`
