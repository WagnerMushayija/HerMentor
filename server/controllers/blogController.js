import { pool } from "../db/connection.js"
import { validationResult } from "express-validator"

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-")
}

// Helper function to generate excerpt
const generateExcerpt = (content, maxLength = 200) => {
  const plainText = content.replace(/<[^>]*>/g, "").replace(/\n/g, " ")
  return plainText.length > maxLength ? plainText.substring(0, maxLength).trim() + "..." : plainText
}

export const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, content } = req.body
    const image_url = req.file ? `/uploads/${req.file.filename}` : null
    const mentor_id = req.user.id

    // Generate slug and excerpt
    const baseSlug = generateSlug(title)
    let slug = baseSlug
    let counter = 1

    // Ensure unique slug
    while (true) {
      const [existingSlug] = await pool.execute("SELECT id FROM blogs WHERE slug = ?", [slug])
      if (existingSlug.length === 0) break
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const excerpt = generateExcerpt(content)

    const [result] = await pool.execute(
      `INSERT INTO blogs (mentor_id, title, content, image_url, excerpt, slug) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [mentor_id, title, content, image_url || null, excerpt, slug],
    )

    // Get the created blog with mentor info
    const [blogRows] = await pool.execute(
      `SELECT b.*, u.name as mentor_name, u.email as mentor_email,
              mp.title as mentor_title
       FROM blogs b
       INNER JOIN users u ON b.mentor_id = u.id
       LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE b.id = ?`,
      [result.insertId],
    )

    res.status(201).json({
      message: "Blog post created successfully",
      blog: blogRows[0],
    })
  } catch (error) {
    console.error("Create blog error:", error)
    res.status(500).json({ message: "Server error creating blog post" })
  }
  console.log("Uploaded file:", req.file)

}

export const getAllBlogs = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const offset = parseInt(req.query.offset, 10) || (page - 1) * limit
    const search = req.query.search

    let query = `
      SELECT b.id, b.title, b.excerpt, b.image_url, b.slug, b.created_at,
             u.name as mentor_name, u.email as mentor_email,
             mp.title as mentor_title
      FROM blogs b
      INNER JOIN users u ON b.mentor_id = u.id
      LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
      WHERE b.published = true
    `

    const params = []

    if (search) {
      query += ` AND (b.title LIKE ? OR b.content LIKE ? OR u.name LIKE ?)`
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    query += ` ORDER BY b.created_at DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`


    const [blogs] = await pool.execute(query, params)

    // Total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM blogs b
      INNER JOIN users u ON b.mentor_id = u.id
      WHERE b.published = true
    `
    const countParams = []

    if (search) {
      countQuery += ` AND (b.title LIKE ? OR b.content LIKE ? OR u.name LIKE ?)`
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm)
    }

    const [countResult] = await pool.execute(countQuery, countParams)
    const total = countResult[0].total

    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fething blogs :(", error)
    res.status(500).json({ message: "Server error fetching blogs" })
  }
}



export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params

    const [blogs] = await pool.execute(
      `SELECT b.*, u.name as mentor_name, u.email as mentor_email,
              mp.title as mentor_title, mp.bio as mentor_bio,
              mp.expertise as mentor_expertise
       FROM blogs b
       INNER JOIN users u ON b.mentor_id = u.id
       LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE b.id = ? AND b.published = true`,
      [id],
    )

    if (blogs.length === 0) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    const blog = blogs[0]

    // Parse mentor expertise if it exists
    if (blog.mentor_expertise) {
      blog.mentor_expertise = JSON.parse(blog.mentor_expertise)
    }

    res.json(blog)
  } catch (error) {
    console.error("Get blog by ID error:", error)
    res.status(500).json({ message: "Server error fetching blog post" })
  }
}

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const [blogs] = await pool.execute(
      `SELECT b.*, u.name as mentor_name, u.email as mentor_email,
              mp.title as mentor_title, mp.bio as mentor_bio,
              mp.expertise as mentor_expertise
       FROM blogs b
       INNER JOIN users u ON b.mentor_id = u.id
       LEFT JOIN mentor_profiles mp ON u.id = mp.user_id
       WHERE b.slug = ? AND b.published = true`,
      [slug],
    )

    if (blogs.length === 0) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    const blog = blogs[0]

    // Parse mentor expertise if it exists
    if (blog.mentor_expertise) {
      blog.mentor_expertise = JSON.parse(blog.mentor_expertise)
    }

    res.json(blog)
  } catch (error) {
    console.error("Get blog by slug error:", error)
    res.status(500).json({ message: "Server error fetching blog post" })
  }
}

export const getMentorBlogs = async (req, res) => {
  try {
    const mentor_id = req.user.id
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    const [blogs] = await pool.execute(
      `SELECT b.*, u.name as mentor_name
       FROM blogs b
       INNER JOIN users u ON b.mentor_id = u.id
       WHERE b.mentor_id = ?
       ORDER BY b.created_at DESC
       LIMIT ? OFFSET ?`,
      [mentor_id, Number.parseInt(limit), Number.parseInt(offset)],
    )

    // Get total count
    const [countResult] = await pool.execute("SELECT COUNT(*) as total FROM blogs WHERE mentor_id = ?", [mentor_id])
    const total = countResult[0].total

    res.json({
      blogs,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get mentor blogs error:", error)
    res.status(500).json({ message: "Server error fetching mentor blogs" })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, content, image_url } = req.body
    const mentor_id = req.user.id

    // Check if blog exists and belongs to mentor
    const [existingBlog] = await pool.execute("SELECT id FROM blogs WHERE id = ? AND mentor_id = ?", [id, mentor_id])

    if (existingBlog.length === 0) {
      return res.status(404).json({ message: "Blog post not found or unauthorized" })
    }

    const excerpt = generateExcerpt(content)

    await pool.execute(
      `UPDATE blogs 
       SET title = ?, content = ?, image_url = ?, excerpt = ?
       WHERE id = ? AND mentor_id = ?`,
      [title, content, image_url || null, excerpt, id, mentor_id],
    )

    res.json({ message: "Blog post updated successfully" })
  } catch (error) {
    console.error("Update blog error:", error)
    res.status(500).json({ message: "Server error updating blog post" })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const mentor_id = req.user.id

    const [result] = await pool.execute("DELETE FROM blogs WHERE id = ? AND mentor_id = ?", [id, mentor_id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Blog post not found or unauthorized" })
    }

    res.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Delete blog error:", error)
    res.status(500).json({ message: "Server error deleting blog post" })
  }
}
