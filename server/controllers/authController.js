import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import { pool } from "../db/connection.js"

// ✅ Include role in the JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  })
}

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, role } = req.body

    const [existingUsers] = await pool.execute("SELECT id FROM users WHERE email = ?", [email])
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const [result] = await pool.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      role,
    ])

    const userId = result.insertId

    if (role === "mentor") {
      await pool.execute("INSERT INTO mentor_profiles (user_id, bio, expertise, experience) VALUES (?, ?, ?, ?)", [
        userId,
        "",
        JSON.stringify([]),
        "",
      ])
    } else {
      await pool.execute(
        "INSERT INTO mentee_profiles (user_id, interests, learning_goals, current_role) VALUES (?, ?, ?, ?)",
        [userId, JSON.stringify([]), "", ""],
      )
    }

    // ✅ Pass role to token generation
    const token = generateToken(userId, role)

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        name,
        email,
        role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error during registration" })
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const [users] = await pool.execute("SELECT id, name, email, password, role FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const user = users[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // ✅ Pass role to token generation
    const token = generateToken(user.id, user.role)

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login" })
  }
}

export const getProfile = async (req, res) => {
  // ✅ Log user info for debugging
  console.log("✅ [GET] /api/auth/profile hit")
  console.log("🔐 req.user =", req.user)

  try {
    const userId = req.user.id
    const userRole = req.user.role

    let profileQuery

    if (userRole === "mentor") {
      profileQuery = `
        SELECT u.id, u.name, u.email, u.role,
               mp.title, mp.bio, mp.expertise, mp.experience, mp.availability, mp.rating, mp.total_reviews
        FROM users u
        LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
        WHERE u.id = ?
      `
    } else {
      profileQuery = `
        SELECT u.id, u.name, u.email, u.role,
               mep.interests, mep.learning_goals, mep.current_role, mep.experience_level
        FROM users u
        LEFT JOIN mentee_profiles mep ON u.id = mep.user_id
        WHERE u.id = ?
      `
    }

    const [rows] = await pool.execute(profileQuery, [userId])

    if (rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" })
    }

    const profile = rows[0]

    if (userRole === "mentor") {
      try {
        profile.expertise = profile.expertise ? JSON.parse(profile.expertise) : []
      } catch (e) {
        console.error("Failed to parse mentor expertise JSON:", e)
        profile.expertise = []
      }
    }
    if (userRole === "mentee") {
      try {
        profile.interests = profile.interests ? JSON.parse(profile.interests) : []
      } catch (e) {
        console.error("Failed to parse mentee interests JSON:", e)
        profile.interests = []
      }
    }

    res.json(profile)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Server error fetching profile" })
  }
}
