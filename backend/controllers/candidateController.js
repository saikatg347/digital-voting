import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Candidate from '../models/candidateModel.js'

const getAllCandidate = asyncHandler(async (req, res) => {
	const candidates = await Candidate.find()
	res.status(201).json(candidates)
})

const voteCandidate = asyncHandler(async (req, res) => {
	const candidate = await Candidate.findById(req.body.id)

	if (!candidate) {
		res.status(400)
		throw new Error('No candidate found')
	}

	if (req.user.voted) {
		res.status(400)
		throw new Error('User have already voted')
	}

	await User.findByIdAndUpdate(req.user._id, {
		voted: req.body.id,
	})

	await Candidate.findByIdAndUpdate(req.body.id, {
		votes: candidate.votes + 1,
	})

	const updatedCandidates = await Candidate.find()
	res.status(201).json(updatedCandidates)
})

const resetVotes = asyncHandler(async (req, res) => {
	await Candidate.updateMany(
		{},
		{
			votes: 0,
		}
	)

	await User.updateMany(
		{},
		{
			voted: null,
		}
	)
	const updatedCandidates = await Candidate.find()
	res.status(201).json(updatedCandidates)
})

export { getAllCandidate, voteCandidate, resetVotes }
