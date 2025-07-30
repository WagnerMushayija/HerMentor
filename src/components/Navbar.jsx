import { useState } from "react"
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

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1001;

  .bar {
    width: 25px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.primary};
    margin: 5px 0;
    transition: 0.4s;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    position: fixed;
    top: 60px;
    right: 0;
    background: ${(props) => props.theme.colors.white};
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    width: 250px;
    height: 100vh;
    box-shadow: ${(props) => props.theme.shadows.medium};
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    gap: 1rem;

    &.open {
      transform: translateX(0);
    }
  }
`

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;

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
  const isDashboard = location.pathname.includes("dashboard")
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuOpen(false)
  }

  return (
    <NavContainer>
      <Logo to="/">HerMentor</Logo>

      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </Hamburger>

      <NavLinks className={menuOpen ? "open" : ""}>
        {user ? (
          <>
            <UserInfo>Welcome, {user.name}</UserInfo>
            {isDashboard ? (
              <>
                <NavLink to="/mentor-dashboard" onClick={() => setMenuOpen(false)}>Mentor Dashboard</NavLink>
                <NavLink to="/mentee-dashboard" onClick={() => setMenuOpen(false)}>Mentee Dashboard</NavLink>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
                {user && user.role === "mentor" && isDashboard && <NavLink to="/mentor/blog/new">Write Blog</NavLink>}
              </>
            ) : (
              <NavLink to={user.role === "mentor" ? "/mentor-dashboard" : "/mentee-dashboard"} onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
            )}
            <NavLink to="/blogs">Blog</NavLink>
            <Button variant="outline" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <Button as={Link} to="/signup" size="small" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Button>
            <NavLink to="/blogs">Blog</NavLink>
          </>
        )}
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
