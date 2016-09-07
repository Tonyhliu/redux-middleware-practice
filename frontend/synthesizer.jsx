import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';

import configureStore from './store/store';
import Root from './components/root';

function addLoggingToDispatch(store) {
  console.log("MADE IT");
  let storeDispatch = store.dispatch
  return (action) => {
    console.log(store.getState());
    console.log(action);
    storeDispatch(action);
    console.log(store.getState());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  addLoggingToDispatch(store);
  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, rootEl);
});
