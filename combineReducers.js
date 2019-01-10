module.exports = (reducers) => (state = {}, action) =>
  Object.keys(reducers)
    .reduce((acc, key) => Object.assign(acc, { [key]: reducers[key](state[key], action) }), {})
