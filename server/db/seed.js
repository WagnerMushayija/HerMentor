import { pool } from "./connection.js"
import bcrypt from "bcryptjs"

const seedData = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await pool.execute("DELETE FROM meetings")
    await pool.execute("DELETE FROM mentorships")
    await pool.execute("DELETE FROM mentor_profiles")
    await pool.execute("DELETE FROM mentee_profiles")
    await pool.execute("DELETE FROM users")

    // Hash password for demo users
    const hashedPassword = await bcrypt.hash("password123", 12)

    // Insert demo users
    const users = [
      ["Alex Thompson", "alex@example.com", hashedPassword, "mentor"],
      ["Maria Garcia", "maria@example.com", hashedPassword, "mentor"],
      ["James Wilson", "james@example.com", hashedPassword, "mentor"],
      ["Sarah Johnson", "sarah@example.com", hashedPassword, "mentee"],
      ["Mike Chen", "mike@example.com", hashedPassword, "mentee"],
      ["Emily Rodriguez", "emily@example.com", hashedPassword, "mentee"],
    ]

    for (const user of users) {
      await pool.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", user)
    }

    // Get user IDs
    const [userRows] = await pool.execute("SELECT id, email, role FROM users")
    const userMap = {}
    userRows.forEach((user) => {
      userMap[user.email] = user
    })

    // Insert mentor profiles
    const mentorProfiles = [
      [
        userMap["alex@example.com"].id,
        "Senior Software Engineer at Google",
        "Senior Software Engineer with 8+ years of experience in full-stack development.",
        JSON.stringify(["React", "Node.js", "System Design", "Leadership"]),
        "8+ years at top tech companies including Google and Facebook.",
        "Weekdays 6-8 PM, Weekends flexible",
        4.9,
        127,
      ],
      [
        userMap["maria@example.com"].id,
        "Product Manager at Stripe",
        "Product Manager with expertise in strategy and user research.",
        JSON.stringify(["Product Strategy", "User Research", "Data Analysis"]),
        "6 years in product management at Stripe, Airbnb, and Microsoft.",
        "Weekdays 7-9 PM",
        4.8,
        89,
      ],
      [
        userMap["james@example.com"].id,
        "Design Director at Figma",
        "Design Director with 10+ years of experience in product design.",
        JSON.stringify(["UX Design", "Design Systems", "User Research"]),
        "10+ years in design at Figma, Uber, and IDEO.",
        "Flexible schedule",
        4.9,
        156,
      ],
    ]

    for (const profile of mentorProfiles) {
      await pool.execute(
        "INSERT INTO mentor_profiles (user_id, title, bio, expertise, experience, availability, rating, total_reviews) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        profile,
      )
    }

    // Insert mentee profiles
    const menteeProfiles = [
      [
        userMap["sarah@example.com"].id,
        JSON.stringify(["React", "Frontend Development", "JavaScript"]),
        "Learning React advanced patterns and state management",
        "Junior Frontend Developer",
        "beginner",
      ],
      [
        userMap["mike@example.com"].id,
        JSON.stringify(["Product Management", "User Research", "Analytics"]),
        "Developing product strategy and user research skills",
        "Product Manager Intern",
        "beginner",
      ],
      [
        userMap["emily@example.com"].id,
        JSON.stringify(["UX Design", "Prototyping", "User Research"]),
        "Building a portfolio and preparing for senior role interviews",
        "UX Designer",
        "intermediate",
      ],
    ]

    for (const profile of menteeProfiles) {
      await pool.execute(
        "INSERT INTO mentee_profiles (user_id, interests, learning_goals, current_role, experience_level) VALUES (?, ?, ?, ?, ?)",
        profile,
      )
    }

    // Create some mentorship relationships
    const mentorships = [
      [userMap["alex@example.com"].id, userMap["sarah@example.com"].id, "active"],
      [userMap["maria@example.com"].id, userMap["mike@example.com"].id, "active"],
      [userMap["james@example.com"].id, userMap["emily@example.com"].id, "active"],
    ]

    for (const mentorship of mentorships) {
      await pool.execute("INSERT INTO mentorships (mentor_id, mentee_id, status) VALUES (?, ?, ?)", mentorship)
    }

    console.log("✅ Database seeded successfully!")
    console.log("Demo login credentials:")
    console.log("Mentor: alex@example.com / password123")
    console.log("Mentee: sarah@example.com / password123")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
  } finally {
    process.exit(0)
  }
}

seedData()
