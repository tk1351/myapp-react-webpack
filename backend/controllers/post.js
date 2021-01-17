const Post = require('../models/post')

module.exports = {
  getAllPosts: (req, res) => {
    Post.find({}, (err, foundPost) => {
      return res.json(foundPost)
    })
  },
  getPostsById: (req, res) => {
    const postId = req.params.postId
    Post.findById(postId, (err, foundPost) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Post not found' }] })
      }
      return res.json(foundPost)
    })
  },
  getPostsByUid: (req, res) => {
    const uid = req.params.uid
    Post.find({ uid }, (err, foundPost) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Post not found' }] })
      }
      return res.json(foundPost)
    })
  },
  addPost: (req, res) => {
    const ArticlePost = new Post()

    ArticlePost.uid = req.body.uid
    ArticlePost.categoryId = req.body.categoryId
    ArticlePost.title = req.body.title
    ArticlePost.text = req.body.text
    ArticlePost.url = req.body.url
    ArticlePost.fav = req.body.fav
    ArticlePost.image = req.body.image

    ArticlePost.save((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json({
          _id: data._id,
          uid: data.uid,
          categoryId: data.categoryId,
          title: data.title,
          text: data.text,
          url: data.url,
          fav: data.fav,
          image: data.image,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      }
    })
  },
  putById: (req, res) => {
    const postId = req.params.postId
    Post.findById(postId, (err, foundPost) => {
      if (err) {
        res.send(err)
      } else {
        foundPost.title = req.body.title
        foundPost.text = req.body.text
        foundPost.categoryId = req.body.categoryId
        foundPost.url = req.body.url
        foundPost.fav = req.body.fav
        foundPost.image = req.body.image

        foundPost.save((err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.json({
              _id: data._id,
              uid: data.uid,
              title: data.title,
              text: data.text,
              categoryId: data.categoryId,
              url: data.url,
              fav: data.fav,
              image: data.image,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            })
          }
        })
      }
    })
  },
  deleteById: (req, res) => {
    const postId = req.params.postId
    Post.deleteOne({ _id: postId }).then((err) => {
      if (err) {
        console.error(err)
      }
      res.json({ delete: 'success' })
    })
  },
  deleteByUid: (req, res) => {
    const uid = req.params.uid
    Post.deleteMany({ uid }).then(() => {
      res.json({ delete: 'success' })
    })
  },
}
