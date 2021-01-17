const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    uid: { type: String, required: true },
    photoUrl: { type: String, required: true },
    text: { type: String, required: true },
    postId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('comment', CommentSchema)
