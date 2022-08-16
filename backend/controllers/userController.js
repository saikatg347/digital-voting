import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const register = asyncHandler(async (req, res) => {
	const { name, image, phone, password } = req.body

	const userExists = await User.findOne({ phone })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({ name, image, phone, password })

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			image: user.image,
			phone: user.phone,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

const login = asyncHandler(async (req, res) => {
	const { phone, password } = req.body

	const user = await User.findOne({ phone })

	if (user && (await user.matchPassword(password))) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			image: user.image,
			phone: user.phone,
			userToken: generateToken(user._id),
			isAdmin: user.isAdmin,
			voted: user.voted
		})
	} else {
		res.status(401)
		throw new Error('Invalid credentials')
	}
})

const profile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			image: user.image,
			phone: user.phone,
			isAdmin: user.isAdmin,
			voted: user.voted
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export { register, login, profile }
