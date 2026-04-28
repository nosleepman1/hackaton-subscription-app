// Bouton d'intérêt avec mise à jour optimiste et animation d'état
// Affiche un état différent selon que l'utilisateur est déjà intéressé ou non

import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { useInterests } from '../../hooks/useInterests'

interface InterestButtonProps {
  projectId: number
}

const InterestButton = ({ projectId }: InterestButtonProps) => {
  const { isInterested, expressInterest, removeInterest, loading } = useInterests()
  const active = isInterested(projectId)

  const handleClick = () => {
    if (active) removeInterest(projectId)
    else expressInterest(projectId)
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
        active
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/20'
      }`}
    >
      <motion.span animate={{ scale: active ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}>
        {active ? <FaHeart size={16} /> : <FiHeart size={16} />}
      </motion.span>
      {active ? 'Intérêt exprimé ✓' : "M'intéresser"}
    </motion.button>
  )
}

export default InterestButton
