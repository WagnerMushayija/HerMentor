import bcrypt from "bcryptjs"
import { pool } from "../db/connection.js"

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, email } = req.body

    // Check if email is already taken by another user
    const [existingUsers] = await pool.execute("SELECT id FROM users WHERE email = ? AND id != ?", [email, userId])

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already taken" })
    }

    await pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, userId])

    res.json({ message: "User updated successfully" })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Server error updating user" })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id

    await pool.execute("DELETE FROM users WHERE id = ?", [userId])

    res.json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Server error deleting account" })
  }
}

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    // Get current password
    const [users] = await pool.execute("SELECT password FROM users WHERE id = ?", [userId])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, users[0].password)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, userId])

    res.json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ message: "Server error changing password" })
  }
}
