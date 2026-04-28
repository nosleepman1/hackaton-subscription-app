// Page d'authentification : connexion et inscription avec détection automatique du rôle
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { useAuthContext } from '../context/AuthContext'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const AuthPage = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const navigate = useNavigate()
  const { role } = useAuthContext()

  const handleSuccess = () => {
    navigate(role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
            <FiZap className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-display font-bold text-[var(--text)]">Hackathon</h1>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-[var(--surface-2)] p-1 mb-6">
          {(['login', 'register'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                tab === t ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'
              }`}>
              {tab === t && (
                <motion.div layoutId="auth-tab" className="absolute inset-0 bg-[var(--surface)] rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{t === 'login' ? 'Connexion' : 'Inscription'}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-app)]">
          <motion.div key={tab} initial={{ opacity: 0, x: tab === 'login' ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {tab === 'login' ? <LoginForm onSuccess={handleSuccess} /> : <RegisterForm onSuccess={handleSuccess} />}
          </motion.div>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          {tab === 'login' ? "Pas encore de compte ? " : "Déjà inscrit ? "}
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} className="text-[var(--accent)] font-medium hover:underline">
            {tab === 'login' ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>
    </motion.div>
  )
}

export default AuthPage
