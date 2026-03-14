import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RoutingProvider } from './contexts/RoutingContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <RoutingProvider>
        <App />
      </RoutingProvider>
    </ToastProvider>
  </StrictMode>,
)
