import jwt from "jsonwebtoken"
import { pool } from "../db/connection.js"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogs")
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

export const uploadMedia = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/
    const ext = path.extname(file.originalname).toLowerCase()
    const mime = file.mimetype
    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  }
})


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
