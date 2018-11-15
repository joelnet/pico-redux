const { createStore } = require('..')

describe('createStore', () => {
  const reducer = (state, { type, value }) =>
    type === 'SET_VALUE' ? { value } : state

  test('initial state', () => {
    const expected = { value: 888 }
    const store = createStore(reducer, expected)
    const actual = store.getState()
    expect(actual).toBe(expected)
  })

  test('dispatch modifies state', () => {
    const expected = { value: 888 }
    const store = createStore(reducer, { value: 666 } )
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    const actual = store.getState()
    expect(actual).toEqual(expected)
  })
})
