import express from 'express'
import {getAllCandidate, voteCandidate, resetVotes} from '../controllers/candidateController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getAllCandidate)
router.put('/vote', protect, voteCandidate)
router.put('/reset', protect, resetVotes)

export default router