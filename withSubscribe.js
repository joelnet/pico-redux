module.exports = createStore => (reducer,...args) => {
  const listeners = []
  const wrapped = (state, action) => (
    action && action.type != '@@init' && setTimeout(() => listeners.forEach(listener => listener()), 0),
    reducer(state, action)
  )
  const store = createStore(wrapped, ...args)

  return Object.assign(
    {},
    store,
    {
      subscribe(listener) {
        listeners.push(listener)
        return () => listeners.splice(listeners.indexOf(listener))
      },
    }
  )
}
