module.exports = function withMiddleware(createStore) {
  return function withMiddleware_createStore(reducer, state, middleware) {
    var args = Array.prototype.slice.call(arguments, 0)
    var store = createStore.apply(this, args)

    return Object.assign(
      {},
      store,
      {
        dispatch: function(action) {
          middleware(store)(function() { store.dispatch(action) })(action)
        }
      }
    )
  }
}
