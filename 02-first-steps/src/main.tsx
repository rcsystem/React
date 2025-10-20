import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirstStepsApp } from './FirstStepsApp'
import { MyawesomeApp } from './MyAwesomeApp'
import { ItemCounter } from './shopping-cart/ItemCounter'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstStepsApp />
    <ItemCounter />
  </StrictMode>,
)
