import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
//Developpement only axios helpers
import axios from 'axios'


import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import App from './components/App'

//Developpement only axios helpers
window.axios = axios

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'))
