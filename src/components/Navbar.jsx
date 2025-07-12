import { Link, useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../context/AuthContext"
import Button from "./Button"

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.small};
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const UserInfo = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-right: 1rem;
`

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isDashboard = location.pathname.includes("dashboard")

  return (
    <NavContainer>
      <Logo to="/">HerMentor</Logo>
      <NavLinks>
        {user ? (
          <>
            <UserInfo>Welcome, {user.name}</UserInfo>
            {isDashboard ? (
              <>
                <NavLink to="/mentor-dashboard">Mentor Dashboard</NavLink>
                <NavLink to="/mentee-dashboard">Mentee Dashboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            ) : (
              <NavLink to={user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard"}>Dashboard</NavLink>
            )}
            <Button variant="outline" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Button as={Link} to="/signup" size="small">
              Sign Up
            </Button>
          </>
        )}
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
