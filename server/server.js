import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { testConnection } from "./db/connection.js"
import path from "path"
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.js"
import mentorRoutes from "./routes/mentors.js"
import menteeRoutes from "./routes/mentees.js"
import contactRoutes from "./routes/contact.js"
import userRoutes from "./routes/users.js"
import blogRoutes from "./routes/blogs.js"
import { dirname } from "path";


// Load environment variables
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/mentors", mentorRoutes)
app.use("/api/mentees", menteeRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.options("*", cors());
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

const startServer = async () => {
  try {
    await testConnection()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📱 Frontend URL: ${process.env.CLIENT_URL}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()


// testConnection().catch(console.error)

// // Export the app for Vercel
// export default app