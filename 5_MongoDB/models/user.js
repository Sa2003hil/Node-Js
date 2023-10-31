import mongoose from 'mongoose'

// Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true // email should be unique for every user
    },
    gender: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String
    }
  },
  { timestamps: true }
)

// Model
const User = mongoose.model('User', userSchema) // this is also a collection name in the database MongoDB

export default User
