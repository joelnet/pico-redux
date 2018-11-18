module.exports = createStore => (reducer, state, middleware) =>
  middleware(createStore)(reducer, state)
