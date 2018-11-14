var createStore = require('..').createStore
var withSubscribe = require('..').withSubscribe

describe('withSubscribe', function() {
  function reducer(state, action) {
    if (action.type === 'SET_VALUE') return { value: action.value }
    return state
  }

  test('subscribe fires after dispatch', function() {
    var store = withSubscribe(createStore)(reducer, { value: 888 })
    var listener = jest.fn()
    store.subscribe(listener)
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    var actual = listener.mock.calls.length
    expect(listener).toBeCalledTimes(1)
  })

  test('can unsubscribe', function() {
    var store = withSubscribe(createStore)(reducer, { value: 888 })
    var listener = jest.fn()
    var unsubscribe = store.subscribe(listener)
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    unsubscribe()
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    var actual = listener.mock.calls.length
    expect(listener).toBeCalledTimes(1)
  })

  test('dispatch modifies state', function() {
    var expected = { value: 888 }
    var store =  withSubscribe(createStore)(reducer, { value: 666 } )
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    var actual = store.getState()
    expect(actual).toEqual(expected)
  })
})
