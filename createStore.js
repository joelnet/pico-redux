module.exports = (reducer, state = reducer(void 0, { type: '@@init' })) => ({
  dispatch: action => (state = reducer(state, action), action),
  getState: () => state
})
