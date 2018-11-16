module.exports = (reducer, state) => ({
  dispatch: action => (state = reducer(state, action), action),
  getState: () => state
})
