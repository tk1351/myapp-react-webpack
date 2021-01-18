import reducer, {
  fetchCommentsData,
  addNewComment,
} from '../features/commentSlice'

let initialState = {
  comments: [],
  status: 'idle',
  error: null,
}

const commentData = {
  uid: '1',
  photoUrl: 'http://',
  text: 'test comment',
  postId: '2',
}

describe('fetchCommentsData', () => {
  it('Should not work fetchCommentsData when pending', () => {
    const action = {
      type: fetchCommentsData.pending.type,
      payload: { commentData },
    }
    const state = reducer(initialState, action)
    expect(state.comments).toEqual([])
    expect(state.status).toEqual('loading')
  })
  it('Should work fetchCommentsData when fulfilled', () => {
    const action = {
      type: fetchCommentsData.fulfilled.type,
      payload: { commentData },
    }
    const state = reducer(initialState, action)
    expect(state.comments).toEqual([{ commentData }])
  })
  it('Should not work fetchCommentsData when rejected', () => {
    const action = {
      type: fetchCommentsData.rejected.type,
      payload: { commentData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.comments).toEqual([])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('addNewComment', () => {
  it('Should work addNewComment when fulfilled', () => {
    const action = {
      type: addNewComment.fulfilled.type,
      payload: { commentData },
    }
    const state = reducer(initialState, action)
    expect(state.comments).toEqual([action.payload])
  })
  it('Should work addNewComment when rejected', () => {
    const action = {
      type: addNewComment.rejected.type,
      payload: { commentData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.comments).toEqual([])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})
