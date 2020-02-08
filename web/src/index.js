/**
 * entry point
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './utilities/reducer';
import App from './App'

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
);