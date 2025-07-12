import express from "express"
import { body } from "express-validator"
import { register, login, getProfile } from "../controllers/authController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Validation rules
const registerValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").isIn(["mentor", "mentee"]).withMessage("Role must be either mentor or mentee"),
]

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Routes
router.post("/register", registerValidation, register)
router.post("/login", loginValidation, login)
router.get("/profile", authenticateToken, getProfile)

export default router
