// Formulaire d'inscription avec validation react-hook-form + zod

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const registerSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
  password_confirmation: z.string().min(6, 'Minimum 6 caractères'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['password_confirmation'],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register: registerUser, loading, error } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
      onSuccess?.()
    } catch {
      // l'erreur est déjà gérée dans le hook useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nom */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nom complet</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            {...register('name')}
            type="text"
            placeholder="Jean Dupont"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
          />
        </div>
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Email</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            {...register('email')}
            type="email"
            placeholder="votre@email.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
          />
        </div>
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Mot de passe */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Mot de passe</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
          />
        </div>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
      </div>

      {/* Confirmation */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Confirmer le mot de passe</label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            {...register('password_confirmation')}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
          />
        </div>
        {errors.password_confirmation && <p className="text-red-400 text-xs mt-1">{errors.password_confirmation.message}</p>}
      </div>

      {/* Erreur serveur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <FiUserPlus size={18} />
            Créer mon compte
          </>
        )}
      </motion.button>
    </form>
  )
}

export default RegisterForm
