const Comment = require('../models/comment')

module.exports = {
  getAllComments: (req, res) => {
    Comment.find({}, (err, foundComment) => {
      return res.json(foundComment)
    })
  },
  getCommentsByUid: (req, res) => {
    const uid = req.params.uid
    Comment.find({ uid }, (err, foundComment) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Comment not found' }] })
      }
      return res.json(foundComment)
    })
  },
  getCommentsByPostId: (req, res) => {
    const postId = req.params.postId
    Comment.find({ postId }, (err, foundComment) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Comment not found' }] })
      }
      return res.json(foundComment)
    })
  },
  addComment: (req, res) => {
    const CommentPost = new Comment()

    CommentPost.uid = req.body.uid
    CommentPost.photoUrl = req.body.photoUrl
    CommentPost.text = req.body.text
    CommentPost.postId = req.body.postId

    CommentPost.save((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json({
          uid: data.uid,
          text: data.text,
          postId: data.postId,
          photoUrl: data.photoUrl,
        })
      }
    })
  },
}
