import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LanguageProvider from './providers/LanguageProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
