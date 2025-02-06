import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './context/LoginContex.jsx'

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <App />
  </LoginProvider>

)
