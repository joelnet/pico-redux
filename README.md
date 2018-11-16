# Pico Redux ![size:65 bytes](https://img.shields.io/badge/size-65_bytes-green.svg) ![dependencies:0](https://img.shields.io/badge/dependencies-0-green.svg)

The smallest possible implementation of Redux. `createStore` minified is 65 bytes.

Pico Redux features a modular design so you only pay (bytes) for the features you use!

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

Adds a `subscribe` method to the Pico Redux store.

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

Even Middleware is an addon.

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
