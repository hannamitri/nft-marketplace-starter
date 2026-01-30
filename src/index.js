import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


reportWebVitals();
