import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js' 
import candidateRoutes from './routes/candidateRoutes.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/user', userRoutes)
app.use('/api/candidate', candidateRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
			.yellow.bold
	)
)
