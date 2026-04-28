// CRUD des thèmes (catégories de projets)
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { useThemes } from '../hooks/useThemes'
import ThemeCard from '../components/theme/ThemeCard'
import ThemeForm from '../components/theme/ThemeForm'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const AdminThemesPage = () => {
  const { themes, loading, createTheme, updateTheme, deleteTheme } = useThemes()
  const [showModal, setShowModal] = useState(false)
  const [editingTheme, setEditingTheme] = useState<typeof themes[0] | null>(null)

  const handleSubmit = async (data: { name: string; description: string; color: string; icon: string }) => {
    if (editingTheme) {
      await updateTheme(editingTheme.id, data)
    } else {
      await createTheme(data)
    }
    setShowModal(false)
    setEditingTheme(null)
  }

  const handleEdit = (theme: typeof themes[0]) => {
    setEditingTheme(theme)
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer ce thème ?')) {
      await deleteTheme(id)
    }
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)]">Thèmes</h1>
          <p className="text-[var(--text-muted)]">{themes.length} thème(s)</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }}
          onClick={() => { setEditingTheme(null); setShowModal(true) }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm">
          <FiPlus size={18} /> Nouveau thème
        </motion.button>
      </div>

      {themes.length === 0 && !loading ? (
        <EmptyState title="Aucun thème" description="Créez votre premier thème pour organiser les projets." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme, i) => (
            <motion.div key={theme.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ThemeCard theme={theme} showActions onEdit={() => handleEdit(theme)} onDelete={() => handleDelete(theme.id)} />
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingTheme(null) }}
        title={editingTheme ? 'Modifier le thème' : 'Nouveau thème'}>
        <ThemeForm
          initialData={editingTheme ? { name: editingTheme.name, description: editingTheme.description, color: editingTheme.color, icon: editingTheme.icon } : undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal>
    </motion.div>
  )
}

export default AdminThemesPage
