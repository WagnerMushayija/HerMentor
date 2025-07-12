import styled from "styled-components"

const Card = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: ${(props) => props.padding || "1.5rem"};
  box-shadow: ${(props) => props.theme.shadows.medium};
  transition: all 0.3s ease;
  
  ${(props) =>
    props.hoverable &&
    `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.large};
    }
  `}
  
  ${(props) =>
    props.variant === "accent" &&
    `
    background: ${props.theme.colors.accent};
  `}
`

export default Card
