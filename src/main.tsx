import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RoutingProvider } from './contexts/RoutingContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'
import { FetchProvider } from './contexts/FetchContext.tsx'
import App from './App.tsx'
import './index.css'
import { PreSessionProvider } from './contexts/PreSessionContext.tsx'

const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL ?? 'http://api.reliance-hci.com'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FetchProvider endpoint={API_ENDPOINT}>
      <ToastProvider>
        <RoutingProvider>
          <PreSessionProvider>
            <App />
          </PreSessionProvider>
        </RoutingProvider>
      </ToastProvider>
    </FetchProvider>
  </StrictMode>
)
