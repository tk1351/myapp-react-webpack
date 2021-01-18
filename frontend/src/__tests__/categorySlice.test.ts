import reducer, { fetchCategoriesData } from '../features/categorySlice'

let initialState = {
  categories: [],
  status: 'idle',
  error: null,
}

const categoryData = {
  _id: '1',
  name: 'test',
}

describe('fetchCategoriesData', () => {
  it('Should not work fetchCategoriesData when pending', () => {
    const action = {
      type: fetchCategoriesData.pending.type,
      payload: { categoryData },
    }
    const state = reducer(initialState, action)
    expect(state.categories).toEqual([])
    expect(state.status).toEqual('loading')
  })
  it('Should work fetchCategoriesData when fulfilled', () => {
    const action = {
      type: fetchCategoriesData.fulfilled.type,
      payload: { categoryData },
    }
    const state = reducer(initialState, action)
    expect(state.categories).toEqual([{ categoryData }])
  })
  it('Should not work fetchCategoriesData when rejected', () => {
    const action = {
      type: fetchCategoriesData.rejected.type,
      payload: { categoryData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.categories).toEqual([])
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Error')
  })
})
