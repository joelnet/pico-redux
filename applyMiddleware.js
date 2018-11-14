module.exports = function applyMiddleware() {
  var middlewares = Array.prototype.slice.call(arguments, 0)

  return function applyMiddleware2(store) {
    return function applyMiddleware3(done) {
      return function applyMiddleware4(action) {
        var i = 0
        function shift() {
          return ++i >= middlewares.length ? done() : next()
        }
        function next() {
          middlewares[i](store)(shift)(action)
        }
        next()
      }
    }
  }
}
