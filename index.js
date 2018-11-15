const applyMiddleware = require('./applyMiddleware')
const createStore = require('./createStore')
const withMiddleware = require('./withMiddleware')
const withSubscribe = require('./withSubscribe')

module.exports = {
  applyMiddleware,
  createStore,
  withMiddleware,
  withSubscribe
}
