import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers.js';
import App from './app.jsx';

const store = createStore(reducers, {
  items: [
    'torch',
    'key1',
    'pot roast',
    'key2',
    'key3'
  ],
  ui: {
    page: 0
  },
  room: {
    items: [
      {
        style: {
          position: 'absolute',
          left: 100,
          top: 100,
          width: 50,
          height: 50,
          'background-color': 'yellow'
        },
        name: 'bong'
      },
      {
        style: {
          position: 'absolute',
          left: 100,
          top: 300,
          width: 70,
          height: 70,
          'background-color': 'purple'
        },
        name: 'grape'
      },
      {
        style: {
          position: 'absolute',
          left: 300,
          top: 250,
          width: 20,
          height: 100,
          'background-color': 'red'
        },
        name: 'gun'
      }
    ]
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
