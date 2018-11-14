module.exports = function withSubscribe(createStore) {
  return function(reducer, state) {
    var listeners = []
    var store = createStore(reducer, state)

    return Object.assign(
      {},
      store,
      {
        dispatch: function(action) {
          store.dispatch(action)
          listeners.forEach(function(listener) { return listener() })
        },
        subscribe: function(listener) {
          listeners.push(listener)
          return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener, 1))
          }
        },
      }
    )
  }
}
