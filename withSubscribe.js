module.exports = function withSubscribe(createStore) {
  return function withSubscribe_createStore() {
    var listeners = []
    var args = Array.prototype.slice.call(arguments, 0)
    var store = createStore.apply(this, args)

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
