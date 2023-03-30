import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LanguageProvider from './providers/LanguageProvider'
import './index.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (import.meta.env.MODE === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
