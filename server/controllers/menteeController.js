import { pool } from "../db/connection.js"

export const updateMenteeProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { interests, learning_goals, current_role, experience_level } = req.body

    await pool.execute(
      `
      UPDATE mentee_profiles 
      SET interests = ?, learning_goals = ?, current_role = ?, experience_level = ?
      WHERE user_id = ?
    `,
      [JSON.stringify(interests), learning_goals, current_role, experience_level, userId],
    )

    res.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update mentee profile error:", error)
    res.status(500).json({ message: "Server error updating profile" })
  }
}

export const requestMentorship = async (req, res) => {
  try {
    const menteeId = req.user.id
    const { mentorId } = req.body

    // Check if mentorship already exists
    const [existing] = await pool.execute("SELECT id FROM mentorships WHERE mentor_id = ? AND mentee_id = ?", [
      mentorId,
      menteeId,
    ])

    if (existing.length > 0) {
      return res.status(400).json({ message: "Mentorship request already exists" })
    }

    // Create mentorship request
    await pool.execute("INSERT INTO mentorships (mentor_id, mentee_id, status) VALUES (?, ?, ?)", [
      mentorId,
      menteeId,
      "pending",
    ])

    res.status(201).json({ message: "Mentorship request sent successfully" })
  } catch (error) {
    console.error("Request mentorship error:", error)
    res.status(500).json({ message: "Server error sending mentorship request" })
  }
}
