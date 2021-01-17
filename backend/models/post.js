const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    uid: { type: String, required: true },
    categoryId: { type: String, required: true },
    title: { type: String, max: [30], required: true },
    text: { type: String, max: [1000], required: true },
    image: { type: String },
    url: { type: String },
    fav: { type: Number },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('post', PostSchema)
