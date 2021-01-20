const mongod = require('../../mongo')
const Category = require('../../models/category')

const categories = [
  {
    name: 'test',
  },
  {
    name: 'test1',
  },
  {
    name: 'test2',
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Category.deleteMany({})
  await Category.collection.insertMany(categories)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Category model test', () => {
  it('Category model works correctly', async () => {
    const result = await Category.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'test' }),
        expect.objectContaining({ name: 'test1' }),
        expect.objectContaining({ name: 'test2' }),
      ])
    )
  })
  it('name should be required', async () => {
    const invalidCategory = {}
    await expect(Category.create(invalidCategory)).rejects.toThrow()
  })
})
