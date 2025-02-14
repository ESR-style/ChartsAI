import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-pivottable/pivottable.css'
import './index.css'
import './styles/grid.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
