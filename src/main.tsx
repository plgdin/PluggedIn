import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // The .tsx extension has been removed from this line
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)