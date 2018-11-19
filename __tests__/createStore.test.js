const { createStore } = require('..')

describe('createStore', () => {
  const reducer = (state, { type, value }) =>
    type === 'SET_VALUE' ? { value } : state

  test('default state', () => {
    const expected = { value: 888 }
    const reducer = (state = expected) => state
    const store = createStore(reducer)
    const actual = store.getState()
    expect(actual).toBe(expected)
  })
  
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

  test('dispatch returns action', () => {
    const expected = { type: 'SET_VALUE', value: 888 }
    const store = createStore(reducer, { value: 666 } )
    const actual = store.dispatch(expected)
    expect(actual).toBe(expected)
  })
})
