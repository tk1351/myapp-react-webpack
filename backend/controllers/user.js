const User = require('../models/user')

module.exports = {
  getAllUsers: (req, res) => {
    User.find({}, (err, foundUser) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'User not found' }] })
      }
      return res.status(200).json(foundUser)
    })
  },
  getUserById: (req, res) => {
    const uid = req.params.uid
    User.find({ uid }, (err, foundUser) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'User not found' }] })
      }
      return res.json(foundUser)
    })
  },
  addUser: (req, res) => {
    const { uid, username, photoUrl, role } = req.body
    if (!uid) {
      return res
        .status(422)
        .send({ errors: [{ title: 'user error', detail: 'uidがありません' }] })
    }
    if (!username) {
      return res.status(422).send({
        errors: [{ title: 'user error', detail: 'usernameがありません' }],
      })
    }
    User.findOne({ uid }, (err, foundUser) => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: 'エラーが発生しました' }],
        })
      }
      if (foundUser) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: '既にユーザーが存在します' }],
        })
      }
      const user = new User({
        uid,
        username,
        photoUrl,
        role,
        company: '',
        position: '',
        bio: '',
        url: '',
      })
      user.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.json({ addUser: 'success' })
        }
      })
    })
  },
  putByUid: (req, res) => {
    const uid = req.params.uid
    User.findOne({ uid }, (err, foundUser) => {
      if (err) {
        res.send(err)
      } else {
        foundUser.uid = req.body.uid
        foundUser.username = req.body.username
        foundUser.photoUrl = req.body.photoUrl
        foundUser.company = req.body.company
        foundUser.position = req.body.position
        foundUser.bio = req.body.bio
        foundUser.url = req.body.url

        foundUser.save((err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.json({
              _id: data._id,
              uid: data.uid,
              username: data.username,
              photoUrl: data.photoUrl,
              company: data.company,
              position: data.position,
              bio: data.bio,
              url: data.url,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              role: data.role,
            })
          }
        })
      }
    })
  },
  deleteByUid: (req, res) => {
    const uid = req.params.uid
    User.deleteOne({ uid }).then(() => {
      res.json({ delete: 'success' })
    })
  },
}
