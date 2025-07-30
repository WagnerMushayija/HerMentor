import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { body } from "express-validator";
import  { dirname } from "path";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  getMentorBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { uploadMedia, authenticateToken, requireRole } from "../middleware/auth.js";

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration — store uploaded images in `/uploads/` folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads/")); // <- create this folder manually
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const router = express.Router();

const blogValidation = [
  body("title").trim().isLength({ min: 5, max: 255 }).withMessage("Title must be between 5 and 255 characters"),
  body("content").trim().isLength({ min: 50 }).withMessage("Content must be at least 50 characters"),
  body("image_url").optional().isURL().withMessage("Image URL must be a valid URL"),
];

// Public routes
router.get("/", getAllBlogs);
router.get("/post/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);

// Protected routes (mentor only)
router.post("/", authenticateToken, requireRole(["mentor"]), upload.single("image"), blogValidation, createBlog);
router.get("/my-blogs", authenticateToken, requireRole(["mentor"]), getMentorBlogs);
router.put("/:id", authenticateToken, requireRole(["mentor"]), blogValidation, updateBlog);
router.delete("/:id", authenticateToken, requireRole(["mentor"]), deleteBlog);

export default router;
