import styled from "styled-components"

const InputContainer = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

const Input = ({ label, ...props }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
    </InputContainer>
  )
}

export default Input
