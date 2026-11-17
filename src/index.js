import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
window.jQuery = $;
window.$ = $;

// Expose jQuery globally so ReactOwlCarousel can access it
window.jQuery = $;
window.$ = $;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();