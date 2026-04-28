// CRUD des projets proposés dans le hackathon
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useProjects } from '../hooks/useProjects'
import { useThemes } from '../hooks/useThemes'
import ProjectForm from '../components/project/ProjectForm'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const AdminProjectsPage = () => {
  const { themes } = useThemes()
  const [filterTheme, setFilterTheme] = useState<number | undefined>(undefined)
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects(filterTheme)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<typeof projects[0] | null>(null)

  const handleSubmit = async (data: { name: string; description: string; theme_id: number; max_members: number; tech_stack: string[] }) => {
    if (editingProject) {
      await updateProject(editingProject.id, data)
    } else {
      await createProject(data)
    }
    setShowModal(false)
    setEditingProject(null)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer ce projet ?')) {
      await deleteProject(id)
    }
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)]">Projets</h1>
          <p className="text-[var(--text-muted)]">{projects.length} projet(s)</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }}
          onClick={() => { setEditingProject(null); setShowModal(true) }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm">
          <FiPlus size={18} /> Nouveau projet
        </motion.button>
      </div>

      {/* Theme filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button onClick={() => setFilterTheme(undefined)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            !filterTheme ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-app)]'
          }`}>
          Tous
        </button>
        {themes.map(t => (
          <button key={t.id} onClick={() => setFilterTheme(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterTheme === t.id ? 'text-white' : 'text-[var(--text-muted)] border border-[var(--border-app)]'
            }`}
            style={filterTheme === t.id ? { backgroundColor: t.color } : {}}>
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      {projects.length === 0 && !loading ? (
        <EmptyState title="Aucun projet" description="Créez votre premier projet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard>
                {project.theme && (
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-3"
                    style={{ backgroundColor: `${project.theme.color}20`, color: project.theme.color }}>
                    {project.theme.name}
                  </span>
                )}
                <h3 className="font-display font-semibold text-[var(--text)] mb-1">{project.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{project.description}</p>
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech_stack.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-auto">
                  <button onClick={() => { setEditingProject(project); setShowModal(true) }}
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                  <span className="ml-auto text-xs text-[var(--text-muted)]">Max {project.max_members} membres</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingProject(null) }}
        title={editingProject ? 'Modifier le projet' : 'Nouveau projet'} size="lg">
        <ProjectForm
          themes={themes}
          initialData={editingProject ? {
            name: editingProject.name,
            description: editingProject.description,
            theme_id: editingProject.theme_id,
            max_members: editingProject.max_members,
            tech_stack: editingProject.tech_stack,
          } : undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal>
    </motion.div>
  )
}

export default AdminProjectsPage
