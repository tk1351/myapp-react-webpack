import reducer, {
  fetchPostData,
  addNewPost,
  updatePost,
  deletePost,
  deletePostWithPostArgument,
  deletePostWithSinglePostArgument,
  deleteUsersPost,
} from '../features/postSlice'

let initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postData = {
  _id: '11111',
  uid: '22222',
  title: 'redux test',
  text: 'reduxのテスト',
  categoryId: '33333',
  url: 'http://test',
  fav: 0,
  image: 'http//img',
}

const updatePostData = {
  _id: '11111',
  uid: '22222',
  title: 'redux test',
  text: 'reduxの更新test',
  categoryId: '33333',
  url: 'http://test',
  fav: 0,
  image: 'http//img',
}

describe('fetchPostData', () => {
  it('Should not fetch postsData when pending', () => {
    const action = { type: fetchPostData.pending.type, payload: { postData } }
    const state = reducer(initialState, action)
    expect(state.posts).toEqual([])
    expect(state.status).toEqual('loading')
  })
  it('Should fetch postsData when fulfilled', () => {
    const action = { type: fetchPostData.fulfilled.type, payload: { postData } }
    const state = reducer(initialState, action)
    expect(state.posts).toEqual([{ postData }])
  })
  it('Should not fetch postsData when rejected', () => {
    const action = {
      type: fetchPostData.rejected.type,
      payload: { postData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.posts).toEqual([])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('addNewPost', () => {
  it('Should work addNewPost when fulfilled', () => {
    const action = { type: addNewPost.fulfilled.type, payload: { postData } }
    const state = reducer(initialState, action)
    expect(state.posts).toEqual([action.payload])
  })
  it('Should not work addNewPost when rejected', () => {
    const action = {
      type: addNewPost.rejected.type,
      payload: { postData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.posts).toHaveLength(0)
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('updatePost', () => {
  it('Should work updatePost when fulfilled', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: updatePost.fulfilled.type,
      payload: { updatePostData },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([{ updatePostData }])
  })
  it('Should not work updatePost when rejected', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: updatePost.rejected.type,
      payload: { updatePostData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([postData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('deletePost', () => {
  it('Should work deletePost when fulfilled', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePost.fulfilled.type,
      action: { postData },
      meta: { arg: postData._id },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toHaveLength(0)
  })
  it('Should not work deletePost when rejected', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePost.rejected.type,
      action: { postData },
      meta: { arg: postData._id },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([postData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('deletePostWithPostArgument', () => {
  it('Should work deletePostWithPostArgument when fulfilled', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePostWithPostArgument.fulfilled.type,
      action: { postData },
      meta: { arg: postData._id },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toHaveLength(0)
  })
  it('Should not work deletePostWithPostArgument when rejected', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePostWithPostArgument.rejected.type,
      action: { postData },
      meta: { arg: postData._id },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([postData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('deletePostWithSinglePostArgument', () => {
  it('Should work deletePostWithSinglePostArgument when fulfilled', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePostWithSinglePostArgument.fulfilled.type,
      action: { postData },
      meta: { arg: postData._id },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toHaveLength(0)
  })
  it('Should not work deletePostWithSinglePostArgument when rejected', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deletePostWithSinglePostArgument.rejected.type,
      action: { postData },
      meta: { arg: postData._id },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([postData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})

describe('deleteUsersPost', () => {
  it('Should work deleteUsersPost when fulfilled', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deleteUsersPost.fulfilled.type,
      action: { postData },
      meta: { arg: postData._id },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toHaveLength(0)
  })
  it('Should not work deleteUsersPost when rejected', () => {
    let initialState = {
      posts: [postData],
      status: 'idle',
      error: null,
    }

    const action = {
      type: deleteUsersPost.rejected.type,
      action: { postData },
      meta: { arg: postData._id },
      error: { message: 'Error' },
    }
    const state = reducer(initialState as any, action)
    expect(state.posts).toEqual([postData])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})
