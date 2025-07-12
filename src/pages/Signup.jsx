"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}10, ${(props) => props.theme.colors.accent}10);
`

const SignupCard = styled(Card)`
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

const RoleSelection = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.text.primary};
  }
  
  .role-options {
    display: flex;
    gap: 1rem;
    
    .role-option {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      
      &.selected {
        border-color: ${(props) => props.theme.colors.primary};
        background: ${(props) => props.theme.colors.primary}10;
      }
      
      input {
        margin-right: 0.5rem;
      }
    }
  }
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`

const LoginLink = styled.p`
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

const Signup = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mentee",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const user = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      // Redirect based on role
      navigate(user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard")
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SignupContainer>
      <SignupCard>
        <Title>Create Account</Title>
        <Subtitle>Join HerMentor and start your journey</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <RoleSelection>
            <label>I want to join as:</label>
            <div className="role-options">
              <div
                className={`role-option ${formData.role === "mentee" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, role: "mentee" })}
              >
                <input
                  type="radio"
                  name="role"
                  value="mentee"
                  checked={formData.role === "mentee"}
                  onChange={handleChange}
                />
                Mentee
              </div>
              <div
                className={`role-option ${formData.role === "mentor" ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, role: "mentor" })}
              >
                <input
                  type="radio"
                  name="role"
                  value="mentor"
                  checked={formData.role === "mentor"}
                  onChange={handleChange}
                />
                Mentor
              </div>
            </div>
          </RoleSelection>

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  )
}

export default Signup
