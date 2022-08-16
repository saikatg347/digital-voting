import mongoose from 'mongoose'

const candidateSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'provide a candidate name'],
		},
		image: {
			type: String,
			required: [true, 'provide an image URL'],
		},
		logo: {
			type: String,
			required: [true, 'provide a logo URL'],
		},
		party: {
			type: String,
			required: [true, 'provide a party name'],
		},
		votes: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

candidateSchema.methods.incrementVote = function () {
  this.votes = this.votes + 1
}

export default mongoose.model('Candidate', candidateSchema)
