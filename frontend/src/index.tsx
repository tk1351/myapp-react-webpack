import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)
