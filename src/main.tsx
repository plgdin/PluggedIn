import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Only HelmetProvider needed here
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* BrowserRouter REMOVED from here to fix the error */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);