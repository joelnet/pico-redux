# Pico Redux ![size:95 bytes](https://img.shields.io/badge/size-95_bytes-green.svg) ![dependencies:0](https://img.shields.io/badge/dependencies-0-green.svg) [![build status](https://travis-ci.org/joelnet/pico-redux.svg?branch=master)](https://travis-ci.org/joelnet/pico-redux) [![Coverage Status](https://coveralls.io/repos/github/joelnet/pico-redux/badge.svg?branch=master)](https://coveralls.io/github/joelnet/pico-redux?branch=master)

The smallest possible implementation of Redux. `createStore` minified is 95 bytes.

Pico Redux features a modular design so you only pay (bytes) for the features you use!

# Differences with Redux

- Pico Redux is modular, so `subscribe` is not included with `createStore`. If you are using `React`, you will need to use `withSubscribe`.

```javascript
// You might need to turn this:
const store = createStore(rootReducer)

// Into this:
const store = withSubscribe(createStore)(rootReducer)
```

# Environment Support

This library supports ES6. If you need to support ES5, you will need to transpile it with Babel.

# Install

```bash
npm install pico-redux --save-prod
```

# Code

Shut up and show me the code.

```javascript
import { createStore } from 'pico-redux'

const init = 0

const reducer = (state, { type, value }) =>
  type === 'INC' ? state + value : state

const store = createStore(reducer, init)

store.dispatch({ type: 'INC', value: 100 })
store.getState() //=> 100
```

# withSubscribe

Adds a `subscribe` method to the Pico Redux store. `withSubscribe` will add 208 bytes (minified).

```javascript
import { createStore, withSubscribe } from 'pico-redux'

const init = 0

const reducer = (state, { type, value }) =>
  type === 'INC' ? state + value : state

const store = withSubscribe(createStore)(reducer, init)
store.subscribe(() => {
  console.log(store.getState()) //=> 100
})

store.dispatch({ type: 'INC', value: 100 })
```

# withMiddleware

Even Middleware is an addon. `withMiddleware` will add 40 bytes (minified) and `applyMiddleware` will add 140 bytes (minified).

```javascript
import { applyMiddleware, createStore, withMiddleware } from 'pico-redux'
import thunk from 'redux-thunk'

const init = {
  name: null
}

const reducer = (state, { type, value }) =>
  type === 'SET_NAME' ? { name: value } : state

const middlewares = applyMiddleware(thunk)

const store = withMiddleware(createStore)(reducer, init, middlewares)

const fetchPerson = id => dispatch =>
  fetch(`https://swapi.co/api/people/${id}`)
    .then(response => response.json())
    .then(data => dispatch({ type: 'SET_NAME', value: data.name }))

store.dispatch(fetchPerson(1))
```
