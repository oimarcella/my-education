import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@styles/main.scss'
import { StudentsProvider } from './context/StudentsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentsProvider>
      <App />
    </StudentsProvider>
  </StrictMode>,
)
