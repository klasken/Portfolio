import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Polices auto-hébergées : servies par le site lui-même, aucun appel à Google Fonts
// (l'adresse IP des visiteurs n'est pas transmise à Google, ce qui évite un souci RGPD).
import '@fontsource-variable/unbounded'
import '@fontsource-variable/hanken-grotesk'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
