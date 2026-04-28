// Liste de projets avec animation décalée (staggered)

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  name: string
  description: string
  max_members: number
  tech_stack?: string[]
  interested_count?: number
  theme?: { id: number; name: string; color: string }
}

interface ProjectListProps {
  projects: Project[]
  showInterest?: boolean
  loading?: boolean
}

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

const ProjectList = ({ projects, showInterest = false, loading = false }: ProjectListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--border-app)] bg-[var(--surface)] p-5 animate-pulse"
          >
            <div className="h-4 w-20 bg-[var(--surface-2)] rounded mb-3" />
            <div className="h-5 w-3/4 bg-[var(--surface-2)] rounded mb-2" />
            <div className="h-4 w-full bg-[var(--surface-2)] rounded mb-1" />
            <div className="h-4 w-2/3 bg-[var(--surface-2)] rounded mb-4" />
            <div className="h-8 w-32 bg-[var(--surface-2)] rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectCard project={project} showInterest={showInterest} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProjectList
