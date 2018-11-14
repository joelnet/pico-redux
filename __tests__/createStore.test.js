var createStore = require('..').createStore

describe('createStore', function() {
  function reducer(state, action) {
    if (action.type === 'SET_VALUE') return { value: action.value }
    return state
  }

  test('initial state', function() {
    var expected = { value: 888 }
    var store = createStore(reducer, expected)
    var actual = store.getState()
    expect(actual).toBe(expected)
  })

  test('dispatch modifies state', function() {
    var expected = { value: 888 }
    var store = createStore(reducer, { value: 666 } )
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    var actual = store.getState()
    expect(actual).toEqual(expected)
  })
})
