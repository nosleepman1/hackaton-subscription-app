// Carte de projet réutilisable avec effet glassmorphism

import { motion } from 'framer-motion'
import { FiUsers, FiCode } from 'react-icons/fi'
import InterestButton from '../interest/InterestButton'

interface ProjectCardProps {
  project: {
    id: number
    name: string
    description: string
    max_members: number
    tech_stack?: string[]
    interested_count?: number
    theme?: { id: number; name: string; color: string }
  }
  showInterest?: boolean
  onClick?: () => void
}

const ProjectCard = ({ project, showInterest = false, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(108,99,255,0.12)' }}
      className="rounded-2xl border border-[var(--border-app)] bg-[var(--surface)] p-5 cursor-pointer transition-colors"
      onClick={onClick}
    >
      {/* Badge thème */}
      {project.theme && (
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-3"
          style={{
            backgroundColor: `${project.theme.color}20`,
            color: project.theme.color,
            border: `1px solid ${project.theme.color}30`,
          }}
        >
          {project.theme.name}
        </span>
      )}

      <h3 className="text-base font-display font-semibold text-[var(--text)] mb-2">{project.name}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{project.description}</p>

      {/* Tech stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <FiCode size={14} className="text-[var(--text-muted)]" />
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)]">
          <FiUsers size={14} />
          <span>{project.interested_count ?? 0} intéressé(s) • Max {project.max_members}</span>
        </div>
        {showInterest && (
          <div onClick={(e) => e.stopPropagation()}>
            <InterestButton projectId={project.id} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard
