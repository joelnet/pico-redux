const { createStore, combineReducers } = require('..')

describe('combineReducers', () => {
  const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([action.text])
      default:
        return state
    }
  }
  
  const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  const reducer = combineReducers({
    todos,
    counter
  })

  test('returns default state', () => {
    const expected = { 'counter': 0, 'todos': [] }
    const store = createStore(reducer)
    const actual = store.getState()
    expect(actual).toEqual(expected)
  })

  test('dispatches event to reducers', () => {
    const expected = { 'counter': 0, 'todos': ['hello'] }
    const store = createStore(reducer)
    store.dispatch({ type: 'ADD_TODO', text: 'hello' })
    const actual = store.getState()
    expect(actual).toEqual(expected)
  })
})
