const Category = require('../models/category')

module.exports = {
  getAllCategories: (req, res) => {
    Category.find({}, (err, foundCategory) => {
      return res.json(foundCategory)
    })
  },
  getCategoryById: (req, res) => {
    const categoryId = req.params.categoryId
    Category.findById(categoryId, function (err, foundCategory) {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Category not found' }] })
      }
      return res.json(foundCategory)
    })
  },
  addCategory: (req, res) => {
    const CategoryPost = new Category()
    CategoryPost.name = req.body.name

    CategoryPost.save(function (err) {
      if (err) {
        res.send(err)
      } else {
        res.json({ categoryPost: 'success' })
      }
    })
  },
}
