module.exports = function createStore(reducer, state) {
  return {
    dispatch: function dispatch(action) {
      state = reducer(state, action)
    },
    getState: function getState() {
      return state
    }
  }
}
