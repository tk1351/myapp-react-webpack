const mongod = require('../../mongo')
const User = require('../../models/user')

const users = [
  {
    username: 'test1',
    uid: '1',
    photoUrl: 'http://test',
    role: 'user',
    company: 'test.co',
    position: 'engineer',
    bio: 'engineer',
    url: 'http://test',
  },
  {
    username: 'test2',
    uid: '2',
    photoUrl: 'http://test',
    role: 'user',
    company: 'test.co',
    position: 'engineer',
    bio: 'engineer',
    url: 'http://test',
  },
  {
    username: 'test3',
    uid: '3',
    photoUrl: 'http://test',
    role: 'user',
    company: 'test.co',
    position: 'engineer',
    bio: 'engineer',
    url: 'http://test',
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.collection.insertMany(users)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('User model test', () => {
  it('User model works correctly', async () => {
    const result = await User.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uid: '1' }),
        expect.objectContaining({ uid: '2' }),
        expect.objectContaining({ uid: '3' }),
      ])
    )

    const findByUid = await User.find({ uid: '1' })
    expect(findByUid).toEqual(
      expect.arrayContaining([expect.objectContaining({ username: 'test1' })])
    )
  })
  it('uid should be unique', async () => {
    const invalidUser = {
      username: 'test11111',
      uid: '1',
      photoUrl: 'http://test11111',
      role: 'user',
      company: 'test.co',
      position: 'engineer',
      bio: 'engineer',
      url: 'http://test',
    }
    await expect(User.create(invalidUser)).rejects.toThrow()
  })
  it('username should be required', async () => {
    const invalidUser = {
      uid: '100',
      photoUrl: 'http://test',
      role: 'user',
      company: 'test.co',
      position: 'engineer',
      bio: 'engineer',
      url: 'http://test',
    }
    await expect(User.create(invalidUser)).rejects.toThrow()
  })
  it('uid should be required', async () => {
    const invalidUser = {
      username: 'test1',
      photoUrl: 'http://test',
      role: 'user',
      company: 'test.co',
      position: 'engineer',
      bio: 'engineer',
      url: 'http://test',
    }
    await expect(User.create(invalidUser)).rejects.toThrow()
  })
  it('photoUrl should be required', async () => {
    const invalidUser = {
      username: 'test1',
      uid: '100',
      role: 'user',
      company: 'test.co',
      position: 'engineer',
      bio: 'engineer',
      url: 'http://test',
    }
    await expect(User.create(invalidUser)).rejects.toThrow()
  })
  it('role should be required', async () => {
    const invalidUser = {
      username: 'test1',
      uid: '100',
      photoUrl: 'http://test',
      company: 'test.co',
      position: 'engineer',
      bio: 'engineer',
      url: 'http://test',
    }
    await expect(User.create(invalidUser)).rejects.toThrow()
  })
})
