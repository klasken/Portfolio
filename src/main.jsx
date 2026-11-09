import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Polices auto-hébergées (pas d'appel à Google Fonts : plus rapide et plus simple côté RGPD)
import '@fontsource/unbounded/latin-500.css'
import '@fontsource/unbounded/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
