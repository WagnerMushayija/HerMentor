import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { AuthProvider } from "./context/AuthContext"
import theme from "./styles/theme"
import Layout from "./components/Layout"
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MentorDashboard from "./pages/MentorDashboard"
import MenteeDashboard from "./pages/MenteeDashboard"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/mentor-dashboard"
              element={
                <ProtectedRoute requiredRole="mentor">
                  <MentorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentee-dashboard"
              element={
                <ProtectedRoute requiredRole="mentee">
                  <MenteeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
