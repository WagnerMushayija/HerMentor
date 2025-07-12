import jwt from "jsonwebtoken"
import { pool } from "../db/connection.js"

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Access token required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from database
    const [rows] = await pool.execute("SELECT id, name, email, role FROM users WHERE id = ?", [decoded.userId])

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = rows[0]
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" })
    }
    next()
  }
}
