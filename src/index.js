import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import KeenSliderDemo from './components/KeenSliderDemo';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

<>
  <KeenSlider />
  <KeenSliderDemo />
</>

reportWebVitals();

