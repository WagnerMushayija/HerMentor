"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import styled from "styled-components"

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.text.secondary};
`

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard"} replace />
  }

  return children
}

export default ProtectedRoute
