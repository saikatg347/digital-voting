import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'provide a name'],
		},
		image: {
			type: String,
			required: [true, 'provide an image URL'],
		},
		phone: {
			type: String,
			required: [true, 'provide a phone number'],
			unique: true,
		},
    isAdmin: {
      type: Boolean,
      default: false
    },
    voted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      default: null
    },
		password: {
			type: String,
			required: [true, 'provide a password'],
		},
	},
	{
		timestamps: true,
	}
)

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)