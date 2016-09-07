import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';

import configureStore from './store/store';
import Root from './components/root';

// function addLoggingToDispatch(store) {
//   console.log("MADE IT");
//   let storeDispatch = store.dispatch
//   return (action) => {
//     console.log(store.getState());
//     console.log(action);
//     storeDispatch(action);
//     console.log(store.getState());
//   }
// }

const addLoggingToDispatch = (store) => (next) => (action) => {
  const OGDispatch = store.dispatch;
  console.log(store.getState());
  console.log(action);
  let returnValue = OGDispatch(action);
  console.log(store.getState());
  return returnValue;
}

const applyMiddlewares = (store, ...middlewares) => {
  let dispatch = store.dispatch
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });
  return Object.assign({}, store, { dispatch });
}

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  // addLoggingToDispatch(store);
  const rootEl = document.getElementById('root');
  const newStore = applyMiddleware(store, addLoggingToDispatch);
  ReactDOM.render(<Root store={store} />, rootEl);
});
