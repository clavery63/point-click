import React from 'react';
import ReactDOM from 'react-dom';
// TODO: The GameRoot component will need its own CSS for when it's embedded
import './index.css';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root'),
);
