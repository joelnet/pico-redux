const applyMiddleware = require('./applyMiddleware')
const combineReducers = require('./combineReducers')
const createStore = require('./createStore')
const withMiddleware = require('./withMiddleware')
const withSubscribe = require('./withSubscribe')

module.exports = {
  applyMiddleware,
  combineReducers,
  createStore,
  withMiddleware,
  withSubscribe
}
