import reducer, {
  fetchAvatars,
  updateUserProfile,
  deleteUser,
} from '../features/userSlice'

let initialState = {
  users: [],
  status: 'idle',
  error: null,
}

const userData = {
  _id: '@',
  uid: '1',
  username: 'test',
  photoUrl: 'http://test',
  company: 'test.co',
  position: 'engineer',
  bio: 'test bio',
  url: 'http://test',
}

const updateUserData = {
  _id: '@',
  uid: '1',
  username: 'test update',
  photoUrl: 'http://test',
  company: 'test.co',
  position: 'software engineer',
  bio: 'test bio',
  url: 'http://test',
}

describe('fetchAvatars', () => {
  it('Should not fetch avatars when pending', () => {
    const action = { type: fetchAvatars.pending.type, payload: { userData } }
    const state = reducer(initialState, action)
    expect(state.users).toEqual([])
    expect(state.status).toEqual('loading')
  })
  it('Should work fetch avatars when fulfilled', () => {
    const action = { type: fetchAvatars.fulfilled.type, payload: { userData } }
    const state = reducer(initialState, action)
    expect(state.users).toEqual([{ userData }])
  })
  it('Should not work fetch avatars when rejected', () => {
    const action = {
      type: fetchAvatars.rejected.type,
      payload: { userData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.users).toEqual([])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('updateUserProfile', () => {
  it('Should worlk updateUserProfile when fulfilled', () => {
    let initialState = {
      users: [userData],
      status: 'idle',
      error: null,
    }
    const action = {
      type: updateUserProfile.fulfilled.type,
      payload: { updateUserData },
    }
    const state = reducer(initialState as any, action)
    expect(state.users).toEqual([{ updateUserData }])
  })
  it('Should not work updateUserProfile when rejected', () => {
    let initialState = {
      users: [userData],
      status: 'idle',
      error: null,
    }
    const action = {
      type: updateUserProfile.rejected.type,
      payload: { updateUserData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.users).toEqual([userData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('deleteUser', () => {
  it('Should work deleteUser when fulfilled', () => {
    let initialState = {
      users: [userData],
      status: 'idle',
      error: null,
    }
    const action = {
      type: deleteUser.fulfilled.type,
      payload: { userData },
      meta: { arg: userData._id },
    }
    const state = reducer(initialState as any, action)
    expect(state.users).toHaveLength(0)
  })
  it('Should not work deleteUser when rejected', () => {
    let initialState = {
      users: [userData],
      status: 'idle',
      error: null,
    }
    const action = {
      type: deleteUser.rejected.type,
      payload: { userData },
      meta: { arg: userData._id },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.users).toEqual([userData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})
