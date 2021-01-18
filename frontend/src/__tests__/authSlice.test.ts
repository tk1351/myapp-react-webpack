import reducer, {
  login,
  logout,
  updateUserProfile,
} from '../features/authSlice'

describe('login', () => {
  it('Should return empty if initialState was empty', () => {
    let initialState = {
      user: {
        uid: '',
        photoUrl: '',
        displayName: '',
        role: '',
      },
    }
    const action = { type: login.type, payload: initialState.user }
    const state = reducer(initialState, action)
    expect(state.user).toEqual(action.payload)
  })
  it('Should return user if required was fulfilled', () => {
    let initialState = {
      user: {
        uid: '1',
        photoUrl: 'http://test',
        displayName: 'test',
        role: 'user',
      },
    }
    const action = { type: login.type, payload: initialState.user }
    const state = reducer(initialState, action)
    expect(state.user).toEqual(action.payload)
    expect(state.user.uid).toEqual(action.payload.uid)
    expect(state.user.photoUrl).toEqual(action.payload.photoUrl)
    expect(state.user.displayName).toEqual(action.payload.displayName)
    expect(state.user.role).toEqual(action.payload.role)
  })
})

describe('logout', () => {
  it('Should return empty when logout', () => {
    let initialState = {
      user: {
        uid: '1',
        photoUrl: 'http://test',
        displayName: 'test',
        role: 'user',
      },
    }

    const logoutUser = {
      uid: '',
      photoUrl: '',
      displayName: '',
      role: '',
    }
    const action = { type: logout.type, payload: undefined }
    const state = reducer(initialState, action)
    expect(state.user).toEqual(logoutUser)
  })
})

describe('updateUserProfile', () => {
  it('Should work updateUserProfile', () => {
    let initialState = {
      user: {
        uid: '1',
        photoUrl: '',
        displayName: '',
        role: '',
      },
    }

    const userProfile = {
      user: {
        uid: '1',
        photoUrl: 'http://test',
        displayName: 'test',
        role: 'user',
      },
    }

    const action = { type: updateUserProfile.type, payload: userProfile.user }
    const state = reducer(initialState, action)
    expect(state.user).toEqual(action.payload)
    expect(state.user.uid).toEqual(action.payload.uid)
    expect(state.user.photoUrl).toEqual(action.payload.photoUrl)
    expect(state.user.displayName).toEqual(action.payload.displayName)
    expect(state.user.role).toEqual(action.payload.role)
  })
})
