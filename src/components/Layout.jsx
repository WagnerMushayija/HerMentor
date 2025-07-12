import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Navbar from "./Navbar"

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  padding-top: ${(props) => (props.hasNavbar ? "80px" : "0")};
`

const Layout = ({ children }) => {
  const location = useLocation()
  const showNavbar = location.pathname !== "/"

  return (
    <LayoutContainer>
      {showNavbar && <Navbar />}
      <MainContent hasNavbar={showNavbar}>{children}</MainContent>
    </LayoutContainer>
  )
}

export default Layout
