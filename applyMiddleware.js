module.exports = (...middlewares) => store => done => action => {
  var i = 0
  const shift = () => ++i >= middlewares.length ? done() : next()
  const next = () => middlewares[i](store)(shift)(action)
  next()
}
