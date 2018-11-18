module.exports = (...middlewares) => createStore => (...args) => {
  const store = createStore(...args)
  const reducer = (acc, middleware) => acc = middleware(store)(acc)
  const dispatch = middlewares.reduceRight(reducer, store.dispatch)

  return Object.assign({}, store, { dispatch })
}
