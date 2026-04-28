// Formulaire d'inscription avec validation react-hook-form + zod

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiUser, FiUserPlus, FiPhone, FiHash, FiBook, FiLayers } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import axiosClient from '../../api/axiosClient'

const registerSchema = z.object({
  firstname: z.string().min(3, 'Minimum 3 caractères'),
  lastname: z.string().min(3, 'Minimum 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  password_confirmation: z.string().min(8, 'Minimum 8 caractères'),
  phone: z.string().min(8, 'Minimum 8 caractères'),
  grade: z.string().min(1, 'Le niveau est requis'),
  filiere: z.string().min(1, 'La filière est requise'),
  matricule: z.string().min(1, 'Le matricule est requis'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['password_confirmation'],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

interface Option {
  value: string
  label: string
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register: registerUser, loading, error } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const [grades, setGrades] = useState<Option[]>([])
  const [filieres, setFilieres] = useState<Option[]>([])

  useEffect(() => {
    axiosClient.get('/auth/grades').then(res => setGrades(res.data))
    axiosClient.get('/auth/filieres').then(res => setFilieres(res.data))
  }, [])

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
      onSuccess?.()
    } catch {
      // l'erreur est déjà gérée dans le hook useAuth
    }
  }

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
  const selectClass = "w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all appearance-none"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Prénom & Nom */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Prénom</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              {...register('firstname')}
              type="text"
              placeholder="Jean"
              className={inputClass}
            />
          </div>
          {errors.firstname && <p className="text-red-400 text-xs mt-1">{errors.firstname.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nom</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              {...register('lastname')}
              type="text"
              placeholder="Dupont"
              className={inputClass}
            />
          </div>
          {errors.lastname && <p className="text-red-400 text-xs mt-1">{errors.lastname.message}</p>}
        </div>
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
            className={inputClass}
          />
        </div>
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Téléphone & Matricule */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Téléphone</label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              {...register('phone')}
              type="tel"
              placeholder="77 123 45 67"
              className={inputClass}
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Matricule</label>
          <div className="relative">
            <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              {...register('matricule')}
              type="text"
              placeholder="20210001"
              className={inputClass}
            />
          </div>
          {errors.matricule && <p className="text-red-400 text-xs mt-1">{errors.matricule.message}</p>}
        </div>
      </div>

      {/* Niveau & Filière */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Niveau</label>
          <div className="relative">
            <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <select {...register('grade')} className={selectClass}>
              <option value="">Choisir...</option>
              {grades.map(g => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          {errors.grade && <p className="text-red-400 text-xs mt-1">{errors.grade.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Filière</label>
          <div className="relative">
            <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <select {...register('filiere')} className={selectClass}>
              <option value="">Choisir...</option>
              {filieres.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          {errors.filiere && <p className="text-red-400 text-xs mt-1">{errors.filiere.message}</p>}
        </div>
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
            className={inputClass}
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
            className={inputClass}
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
