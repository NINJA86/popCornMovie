import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Stars from './components/Stars/Stars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Stars /> */}
  </React.StrictMode>
);
