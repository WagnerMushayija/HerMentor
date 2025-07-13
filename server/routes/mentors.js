import express from "express"
import { getAllMentors, getMentorById, getMentees, updateMentorProfile } from "../controllers/mentorController.js"
import { authenticateToken, requireRole } from "../middleware/auth.js"
import { updateMentorshipStatus } from "../controllers/mentorController.js"

const router = express.Router()

router.get("/", getAllMentors)
router.get("/:id", getMentorById)
router.get("/dashboard/mentees", authenticateToken, requireRole(["mentor"]), getMentees)
router.put("/profile", authenticateToken, requireRole(["mentor"]), updateMentorProfile)
router.post("/mentorship/status", authenticateToken, requireRole(["mentor"]), updateMentorshipStatus)
export default router
