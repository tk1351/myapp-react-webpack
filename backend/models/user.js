const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    role: { type: String, required: true },
    company: String,
    position: String,
    bio: String,
    url: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('user', UserSchema)
