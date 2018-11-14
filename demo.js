const createStore = require('./createStore')
const withSubscribe = require('./withSubscribe')
const withMiddleware = require('./withMiddleware')
const applyMiddleware = require('./applyMiddleware')

const init = { count: 0 }

const reducer = (state, { type, value }) =>
  type === 'SET' ? { count: value } : state

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

const middleware = applyMiddleware(thunk)

const store = withSubscribe(withMiddleware(createStore))(reducer, init, middleware)
store.subscribe(() => {
  console.log({ state: store.getState() })
})

store.dispatch(function(dispatch, getState){
  console.log({ dispatch })
  dispatch({ type: 'SET', value: 8 })
  setTimeout(() => dispatch({ type: 'SET', value: 8 }), 1000)
})

store.dispatch({ type: 'SET', value: 4 })
