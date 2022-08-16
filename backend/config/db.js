import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log(`mongodb connected: ${conn.connection.host}`.cyan.bold)
	} catch (err) {
		console.log(`mongodb error: ${err.message}`.red.underline)
		process.exit(1)
	}
}

export default connectDB
