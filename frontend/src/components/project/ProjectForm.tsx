// Formulaire de projet avec validation (création/édition)

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'
import { useState } from 'react'

const projectSchema = z.object({
  name: z.string().min(3, 'Minimum 3 caractères'),
  description: z.string().min(10, 'Minimum 10 caractères'),
  theme_id: z.number({ required_error: 'Sélectionnez un thème' }),
  max_members: z.number().min(2, 'Minimum 2 membres').max(10, 'Maximum 10 membres'),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface Theme {
  id: number
  name: string
  color: string
}

interface ProjectFormProps {
  themes: Theme[]
  initialData?: Partial<ProjectFormData & { tech_stack: string[] }>
  onSubmit: (data: ProjectFormData & { tech_stack: string[] }) => Promise<void>
  loading?: boolean
}

const ProjectForm = ({ themes, initialData, onSubmit, loading }: ProjectFormProps) => {
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || [])
  const [techInput, setTechInput] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData,
  })

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()])
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    await onSubmit({ ...data, tech_stack: techStack })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nom du projet</label>
        <input
          {...register('name')}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all resize-none"
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Thème</label>
        <select
          {...register('theme_id', { valueAsNumber: true })}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none"
        >
          <option value="">Sélectionner un thème</option>
          {themes.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {errors.theme_id && <p className="text-red-400 text-xs mt-1">{errors.theme_id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Membres max</label>
        <input
          {...register('max_members', { valueAsNumber: true })}
          type="number"
          min={2}
          max={10}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none"
        />
        {errors.max_members && <p className="text-red-400 text-xs mt-1">{errors.max_members.message}</p>}
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Stack technique</label>
        <div className="flex gap-2 mb-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            placeholder="React, Node.js..."
            className="flex-1 px-4 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none text-sm"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)]/20 transition-colors"
          >
            Ajouter
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] cursor-pointer hover:bg-red-500/10 hover:text-red-400 transition-colors"
              onClick={() => removeTech(tech)}
            >
              {tech} ×
            </span>
          ))}
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

export default ProjectForm
