import { pool } from "../db/connection.js"

export const getAllMentors = async (req, res) => {
  try {
    const { search } = req.query

    let query = `
      SELECT u.id, u.name, u.email,
             mp.title, mp.bio, mp.expertise, mp.experience, mp.rating, mp.total_reviews
      FROM users u
      INNER JOIN mentor_profiles mp ON u.id = mp.user_id
      WHERE u.role = 'mentor'
    `

    const params = []

    if (search) {
      query += ` AND (u.name LIKE ? OR mp.title LIKE ? OR mp.bio LIKE ?)`
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    query += ` ORDER BY mp.rating DESC, mp.total_reviews DESC`

    const [rows] = await pool.execute(query, params)

    // Parse expertise with try-catch
    const mentors = rows.map((mentor) => ({
      ...mentor,
      expertise: (() => {
        try {
          return mentor.expertise ? JSON.parse(mentor.expertise) : []
        } catch (e) {
          console.error("Failed to parse mentor expertise JSON:", e)
          return []
        }
      })(),
    }))

    res.json(mentors)
  } catch (error) {
    console.error("Get mentors error:", error)
    res.status(500).json({ message: "Server error fetching mentors" })
  }
}

export const getMentorById = async (req, res) => {
  try {
    const { id } = req.params

    const [rows] = await pool.execute(
      `
      SELECT u.id, u.name, u.email,
             mp.title, mp.bio, mp.expertise, mp.experience, mp.availability, mp.rating, mp.total_reviews
      FROM users u
      INNER JOIN mentor_profiles mp ON u.id = mp.user_id
      WHERE u.id = ? AND u.role = 'mentor'
    `,
      [id],
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: "Mentor not found" })
    }

    const mentor = rows[0]

    // Safe parse of expertise
    try {
      mentor.expertise = mentor.expertise ? JSON.parse(mentor.expertise) : []
    } catch (e) {
      console.error("Failed to parse mentor expertise JSON:", e)
      mentor.expertise = []
    }

    res.json(mentor)
  } catch (error) {
    console.error("Get mentor error:", error)
    res.status(500).json({ message: "Server error fetching mentor" })
  }
}

export const getMentees = async (req, res) => {
  try {
    const mentorId = req.user.id
    const { search } = req.query

    let query = `
      SELECT u.id, u.name, u.email,
             mep.interests, mep.learning_goals, mep.current_role, mep.experience_level,
             m.status as mentorship_status
      FROM mentorships m
      INNER JOIN users u ON u.id = m.mentee_id
      LEFT JOIN mentee_profiles mep ON mep.user_id = u.id
      WHERE m.mentor_id = ?
    `

    const params = [mentorId]

    if (search) {
      query += ` AND (u.name LIKE ? OR mep.current_role LIKE ?)`
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    query += ` ORDER BY m.created_at DESC`

    const [rows] = await pool.execute(query, params)

    const mentees = rows.map((mentee) => ({
      ...mentee,
      interests: (() => {
        try {
          return mentee.interests ? JSON.parse(mentee.interests) : []
        } catch (e) {
          console.error("Failed to parse mentee interests JSON:", e)
          return []
        }
      })(),
    }))

    res.json(mentees)
  } catch (error) {
    console.error("Get mentees error:", error)
    res.status(500).json({ message: "Server error fetching mentees" })
  }
}

export const updateMentorProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { title, bio, expertise, experience, availability } = req.body

    await pool.execute(
      `
      UPDATE mentor_profiles 
      SET title = ?, bio = ?, expertise = ?, experience = ?, availability = ?
      WHERE user_id = ?
    `,
      [title, bio, JSON.stringify(expertise), experience, availability, userId],
    )

    res.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update mentor profile error:", error)
    res.status(500).json({ message: "Server error updating profile" })
  }
}


export const updateMentorshipStatus = async (req, res) => {
  const { menteeId, status } = req.body
  const mentorId = req.user.id

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" })
  }

  try {
    const [result] = await pool.execute(
      `UPDATE mentorships SET status = ?, updated_at = NOW() WHERE mentor_id = ? AND mentee_id = ?`,
      [status, mentorId, menteeId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mentorship not found" })
    }

    res.json({ message: `Mentorship ${status}` })
  } catch (error) {
    console.error("Error updating mentorship status:", error)
    res.status(500).json({ message: "Server error" })
  }
}
