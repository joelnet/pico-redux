module.exports = function applyMiddleware() {
  var middlewares = Array.prototype.slice.call(arguments, 0)

  return function applyMiddleware2(store) {
    return function applyMiddleware3(done) {
      return function applyMiddleware4(action) {
        var middlewareQueue = middlewares.slice(0)
        function shift() {
          middlewareQueue.shift()
          return middlewareQueue.length === 0 ? done() : next()
        }
        function next() {
          middlewares[0](store)(shift)(action)
        }
        next()
      }
    }
  }
}
