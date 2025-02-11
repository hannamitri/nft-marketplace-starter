import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Index = () => {
  useEffect(() => {
    // Check if jQuery is already loaded
    if (!window.jQuery) {
      const script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('jQuery loaded');
        // Now you can safely use jQuery
      };
    }
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// Measure performance (optional)
reportWebVitals();
