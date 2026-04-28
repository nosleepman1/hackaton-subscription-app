// Point d'entrée de l'application
// Enveloppe l'ensemble avec les providers de contexte (auth, thème) et le routeur

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/ui/Toast'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <BrowserRouter>
      {/* Provider de thème : doit envelopper toute l'app pour appliquer les classes CSS */}
      <ThemeProvider>
        {/* Provider d'authentification : gère le token Sanctum et le rôle utilisateur */}
        <AuthProvider>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
