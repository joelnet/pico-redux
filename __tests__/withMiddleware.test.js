const { applyMiddleware, createStore, withMiddleware } = require('pico-redux')

describe('withMiddleware', () => {
  const reducer = (state, { type, value }) =>
    type === 'SET_VALUE' ? { value } : state

  const thunk = store => next => action =>
    typeof action === 'function'
      ? action(store.dispatch, store.getState)
      : next(action)

  const middlewares = applyMiddleware(thunk)

  test('middleware runs', () => {
    expect.assertions(1)
    const expected = { value: 888 }
    const store = withMiddleware(createStore)(reducer, { value: 444 }, middlewares)
    const action = dispatch => new Promise(resolve =>
      setTimeout(() => resolve(dispatch({ type: 'SET_VALUE', value: 888 })), 0)
    )
    return store.dispatch(action)
      .then(() => {
        const actual = store.getState()
        expect(actual).toEqual(expected)
      })
  })
})
