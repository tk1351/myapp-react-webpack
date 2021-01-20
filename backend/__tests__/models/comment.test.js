const mongod = require('../../mongo')
const Comment = require('../../models/comment')

const comments = [
  {
    uid: '1',
    photoUrl: 'http://test',
    text: 'test comment',
    postId: '2',
  },
  {
    uid: '11',
    photoUrl: 'http://test',
    text: 'test comment',
    postId: '22',
  },
  {
    uid: '111',
    photoUrl: 'http://test',
    text: 'test comment',
    postId: '222',
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Comment.deleteMany({})
  await Comment.collection.insertMany(comments)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Comment model test', () => {
  it('Comment model works correctly', async () => {
    const result = await Comment.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uid: '1' }),
        expect.objectContaining({ uid: '11' }),
        expect.objectContaining({ uid: '111' }),
      ])
    )

    const findByUid = await Comment.find({ uid: '11' })
    expect(findByUid).toEqual(
      expect.arrayContaining([expect.objectContaining({ postId: '22' })])
    )
  })
  it('uid should be required', async () => {
    const invalidComment = {
      photoUrl: 'http://test',
      text: 'test comment',
      postId: '2',
    }
    await expect(Comment.create(invalidComment)).rejects.toThrow()
  })
  it('photoUrl should be required', async () => {
    const invalidComment = {
      uid: '1',
      text: 'test comment',
      postId: '2',
    }
    await expect(Comment.create(invalidComment)).rejects.toThrow()
  })
  it('text should be required', async () => {
    const invalidComment = {
      uid: '1',
      photoUrl: 'http://test',
      postId: '2',
    }
    await expect(Comment.create(invalidComment)).rejects.toThrow()
  })
  it('postId should be required', async () => {
    const invalidComment = {
      uid: '1',
      photoUrl: 'http://test',
      text: 'test comment',
    }
    await expect(Comment.create(invalidComment)).rejects.toThrow()
  })
})
