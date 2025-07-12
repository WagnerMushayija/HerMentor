import { validationResult } from "express-validator"
import { pool } from "../db/connection.js"

export const submitContactForm = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, message } = req.body

    await pool.execute("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", [name, email, message])

    res.status(201).json({ message: "Message sent successfully" })
  } catch (error) {
    console.error("Contact form error:", error)
    res.status(500).json({ message: "Server error sending message" })
  }
}
