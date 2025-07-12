import express from "express"
import { updateMenteeProfile, requestMentorship } from "../controllers/menteeController.js"
import { authenticateToken, requireRole } from "../middleware/auth.js"

const router = express.Router()

router.put("/profile", authenticateToken, requireRole(["mentee"]), updateMenteeProfile)
router.post("/request-mentorship", authenticateToken, requireRole(["mentee"]), requestMentorship)

export default router
