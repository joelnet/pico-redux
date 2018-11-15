const createStore = require('./createStore')
const withSubscribe = require('./withSubscribe')
const withMiddleware = require('./withMiddleware')
const applyMiddleware = require('./applyMiddleware')
const reduxThunk = require('redux-thunk').default

const init = { count: 0 }

const reducer = (state, { type, value }) =>
  type === 'SET' ? { count: value } : state

const middleware = applyMiddleware(reduxThunk)

//const store = withSubscribe(withMiddleware(createStore))(reducer, init, middleware)
const store = withMiddleware(withSubscribe(createStore))(reducer, init, middleware)
store.subscribe(() => {
  global.console.log({ state: store.getState() })
})

store.dispatch(dispatch => {
  setTimeout(() => dispatch({ type: 'SET', value: 8 }), 1000)
})

store.dispatch({ type: 'SET', value: 4 })
