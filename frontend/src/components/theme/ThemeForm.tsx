// Formulaire de thème (création/édition)

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'

const themeSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères'),
  description: z.string().min(5, 'Minimum 5 caractères'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Couleur hexadécimale valide requise'),
  icon: z.string().min(1, 'Icône requise'),
})

type ThemeFormData = z.infer<typeof themeSchema>

interface ThemeFormProps {
  initialData?: Partial<ThemeFormData>
  onSubmit: (data: ThemeFormData) => Promise<void>
  loading?: boolean
}

const ThemeForm = ({ initialData, onSubmit, loading }: ThemeFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: { color: '#6C63FF', icon: '🎯', ...initialData },
  })

  const colorValue = watch('color')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nom</label>
        <input
          {...register('name')}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Description</label>
        <textarea
          {...register('description')}
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none resize-none"
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Couleur</label>
          <div className="flex items-center gap-2">
            <input
              {...register('color')}
              type="color"
              className="w-10 h-10 rounded-lg border-0 cursor-pointer"
            />
            <input
              {...register('color')}
              type="text"
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none text-sm"
            />
          </div>
          {errors.color && <p className="text-red-400 text-xs mt-1">{errors.color.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Icône (emoji)</label>
          <input
            {...register('icon')}
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none text-center text-lg"
          />
          {errors.icon && <p className="text-red-400 text-xs mt-1">{errors.icon.message}</p>}
        </div>
      </div>

      {/* Aperçu */}
      <div className="p-4 rounded-xl border border-[var(--border-app)]">
        <p className="text-xs text-[var(--text-muted)] mb-2">Aperçu</p>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${colorValue}20`, color: colorValue }}
          >
            {watch('icon') || '🎯'}
          </div>
          <span className="font-medium text-[var(--text)]">{watch('name') || 'Nom du thème'}</span>
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorValue }} />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold disabled:opacity-50"
      >
        <FiSave size={18} />
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </motion.button>
    </form>
  )
}

export default ThemeForm
