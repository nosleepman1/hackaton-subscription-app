// Conteneur principal de l'application
// overflow-x-hidden empêche tout scroll horizontal parasite
// Sur mobile : padding bottom pour la bottom nav
// Sur desktop : padding left pour la sidebar (collapsed = 64px)

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden w-full max-w-full">
      <Sidebar />

      <main className="flex-1 min-w-0 pb-20 lg:pb-0 lg:ml-16 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}

export default AppLayout
