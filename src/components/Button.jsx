import styled from "styled-components"

const Button = styled.button`
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.5rem 1rem"
      case "large":
        return "1rem 2rem"
      default:
        return "0.75rem 1.5rem"
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.875rem"
      case "large":
        return "1.125rem"
      default:
        return "1rem"
    }
  }};
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${(props) => {
    if (props.variant === "outline") {
      return `
        background: transparent;
        color: ${props.theme.colors.primary};
        border: 2px solid ${props.theme.colors.primary};
        
        &:hover {
          background: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
        }
      `
    }
    return `
      background: ${props.theme.colors.primary};
      color: ${props.theme.colors.white};
      border: 2px solid ${props.theme.colors.primary};
      
      &:hover {
        background: ${props.theme.colors.secondary};
        border-color: ${props.theme.colors.secondary};
        transform: translateY(-2px);
      }
    `
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

export default Button
