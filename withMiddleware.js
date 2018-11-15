module.exports = createStore => (reducer, state, middleware, ...rest) => {
  const store = createStore(reducer, state, middleware, ...rest)

  return Object.assign(
    {},
    store,
    {
      dispatch(action) {
        middleware(store)(() => store.dispatch(action))(action)
      }
    }
  )
}
