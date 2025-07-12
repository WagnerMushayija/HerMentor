import express from "express"
import { body } from "express-validator"
import { updateUser, deleteUser, changePassword } from "../controllers/userController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

const updateUserValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
]

const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
]

router.put("/", authenticateToken, updateUserValidation, updateUser)
router.delete("/", authenticateToken, deleteUser)
router.put("/change-password", authenticateToken, changePasswordValidation, changePassword)

export default router
