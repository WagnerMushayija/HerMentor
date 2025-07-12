import express from "express"
import { body } from "express-validator"
import { submitContactForm } from "../controllers/contactController.js"

const router = express.Router()

const contactValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
]

router.post("/", contactValidation, submitContactForm)

export default router
