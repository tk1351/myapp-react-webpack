import reducer, { searchPosts } from '../features/searchSlice'

describe('Reducer of Search Function', () => {
  describe('search action', () => {
    let initialState = [{ values: { q: '' } }]
    it('Should return empty if query was empty', () => {
      const action = { type: searchPosts.type }
      const state = reducer(initialState, action)
      expect(state[0].values.q).toEqual('')
    })
    it('Should return query if query', () => {
      let initialState = [{ values: { q: 'test' } }]
      const action = { type: searchPosts.type }
      const state = reducer(initialState, action)
      expect(state[0].values.q).toEqual('test')
    })
  })
})
