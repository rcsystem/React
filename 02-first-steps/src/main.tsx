import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirstStepsApp } from './FirstStepsApp'
import { MyawesomeApp } from './MyAwesomeApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstStepsApp />
    <MyawesomeApp />
  </StrictMode>,
)
