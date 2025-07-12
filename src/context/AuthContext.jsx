import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token")
      const savedUser = localStorage.getItem("user")

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser))
          // Optionally verify token with backend
          await authAPI.getProfile()
        } catch (error) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, user: userData } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      const { token, user: newUser } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(newUser))
      setUser(newUser)

      return newUser
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
