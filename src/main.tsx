import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RoutingProvider } from './contexts/RoutingContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'
import { FetchProvider } from './contexts/FetchContext.tsx'
import { SessionProvider } from './contexts/SessionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FetchProvider endpoint="http://api.reliance-hci.com">
      <ToastProvider>
        <SessionProvider>
          <RoutingProvider>
            <App />
          </RoutingProvider>
        </SessionProvider>
      </ToastProvider>
    </FetchProvider>
  </StrictMode>,
)
