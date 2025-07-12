import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { testConnection } from "./db/connection.js"

// Import routes
import authRoutes from "./routes/auth.js"
import mentorRoutes from "./routes/mentors.js"
import menteeRoutes from "./routes/mentees.js"
import contactRoutes from "./routes/contact.js"
import userRoutes from "./routes/users.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/mentors", mentorRoutes)
app.use("/api/mentees", menteeRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/users", userRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "HerMentor API is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server
const startServer = async () => {
  try {
    await testConnection()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📱 Frontend URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
