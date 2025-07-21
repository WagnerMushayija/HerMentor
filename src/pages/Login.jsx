import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}10, ${(props) => props.theme.colors.accent}10);
`

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
  font-size: 2rem;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
`

const Form = styled.form`
  text-align: left;
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`

const SignupLink = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  
  a {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const DemoCredentials = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: left;
  
  h4 {
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.secondary};
  }
  
  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await login(formData)
      // Redirect based on role
      navigate(user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (email) => {
    setFormData({ email, password: "password123" })
    setError("")
    setLoading(true)

    try {
      const user = await login({ email, password: "password123" })
      navigate(user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your HerMentor account</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        {/* <DemoCredentials>
          <h4>Demo Accounts:</h4>
          <p>
            <strong>Mentor:</strong>
            <Button
              size="small"
              variant="outline"
              onClick={() => handleDemoLogin("alex@example.com")}
              style={{ marginLeft: "0.5rem", fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
            >
              alex@example.com
            </Button>
          </p>
          <p>
            <strong>Mentee:</strong>
            <Button
              size="small"
              variant="outline"
              onClick={() => handleDemoLogin("sarah@example.com")}
              style={{ marginLeft: "0.5rem", fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
            >
              sarah@example.com
            </Button>
          </p>
          <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>Password: password123</p>
        </DemoCredentials> */}

        <SignupLink>
          Don't have an account? <Link to="/signup">Create one</Link>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
