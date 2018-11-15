const { createStore, withSubscribe } = require('..')

describe('withSubscribe', () => {
  const reducer = (state, { type, value }) =>
    type === 'SET_VALUE' ? { value } : state

  const sleep = () => new Promise(resolve => setTimeout(resolve, 0))

  test('subscribe fires after dispatch', done => {
    expect.assertions(1)
    const store = withSubscribe(createStore)(reducer, { value: 888 })
    const listener = jest.fn()
    store.subscribe(listener)
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    return sleep()
      .then(() => expect(listener).toBeCalledTimes(1))
      .then(() => done())
  })

  test('can unsubscribe', done => {
    expect.assertions(1)
    const store = withSubscribe(createStore)(reducer, { value: 888 })
    const listener = jest.fn()
    const unsubscribe = store.subscribe(listener)
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    return sleep()
      .then(() => unsubscribe())
      .then(() => store.dispatch({ type: 'SET_VALUE', value: 888 }))
      .then(sleep)
      .then(() => expect(listener).toBeCalledTimes(1))
      .then(() => done())
  })

  test('dispatch modifies state', () => {
    const expected = { value: 888 }
    const store =  withSubscribe(createStore)(reducer, { value: 666 } )
    store.dispatch({ type: 'SET_VALUE', value: 888 })
    const actual = store.getState()
    expect(actual).toEqual(expected)
  })
})
