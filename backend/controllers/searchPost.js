const Post = require('../models/post')

module.exports = {
  getSearchResult: (req, res) => {
    const q = req.query.q

    if (!q) {
      Post.find({}, function (err, foundPost) {
        if (err) {
          return res
            .status(422)
            .send({ errors: [{ title: 'search error', detail: 'エラー発生' }] })
        }
        if (!foundPost) {
          return res.status(422).send({
            errors: [{ title: 'search error', detail: '投稿が存在しません' }],
          })
        }
        return res.status(400).send({
          errors: [
            { title: 'search error', detail: '検索ワードを入れてください。' },
          ],
        })
      })
    } else {
      Post.find(
        {
          $or: [
            { title: new RegExp('.*' + q + '.*') },
            { text: new RegExp('.*' + q + '.*') },
          ],
        },
        function (err, foundPost) {
          if (err) {
            return res.status(422).send({
              errors: [{ title: 'search error', detail: 'エラー発生' }],
            })
          }
          if (!foundPost) {
            return res.status(422).send({
              errors: [
                { title: 'search error', detail: '投稿が存在しません。' },
              ],
            })
          }
          return res.json(foundPost)
        }
      )
    }
  },
}
