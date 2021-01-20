const mongod = require('../../mongo')
const Post = require('../../models/post')

const posts = [
  {
    uid: '1',
    categoryId: '2',
    title: 'test1',
    text: 'text1',
    image: 'http://1',
    url: 'http://2',
    fav: 1,
  },
  {
    uid: '11',
    categoryId: '22',
    title: 'test2',
    text: 'text2',
    image: 'http://11',
    url: 'http://22',
    fav: 2,
  },
  {
    uid: '111',
    categoryId: '222',
    title: 'test3',
    text: 'text3',
    image: 'http://111',
    url: 'http://222',
    fav: 3,
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Post.deleteMany({})
  await Post.collection.insertMany(posts)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Post model test', () => {
  it('Post model works correctly', async () => {
    const result = await Post.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uid: '1' }),
        expect.objectContaining({ uid: '11' }),
        expect.objectContaining({ uid: '111' }),
      ])
    )

    const findByUid = await Post.find({ uid: '111' })
    expect(findByUid).toEqual(
      expect.arrayContaining([expect.objectContaining({ text: 'text3' })])
    )
  })
  it('Post model should have uid', async () => {
    const invalidPost = {
      categoryId: '222',
      title: 'test3',
      text: 'text3',
      image: 'http://111',
      url: 'http://222',
      fav: 3,
    }
    await expect(Post.create(invalidPost)).rejects.toThrow()
  })
  it('Post model should have categoryId', async () => {
    const invalidPost = {
      uid: '222',
      title: 'test3',
      text: 'text3',
      image: 'http://111',
      url: 'http://222',
      fav: 3,
    }
    await expect(Post.create(invalidPost)).rejects.toThrow()
  })
  it('Post model should have title', async () => {
    const invalidPost = {
      uid: '222',
      categoryId: 'test3',
      text: 'text3',
      image: 'http://111',
      url: 'http://222',
      fav: 3,
    }
    await expect(Post.create(invalidPost)).rejects.toThrow()
  })
  it('Post model should have text', async () => {
    const invalidPost = {
      uid: '222',
      categoryId: 'test3',
      title: 'text3',
      image: 'http://111',
      url: 'http://222',
      fav: 3,
    }
    await expect(Post.create(invalidPost)).rejects.toThrow()
  })
})
