import { useState } from "react"
import { BookOpen, FolderHeart, Users, LayoutGrid, ShieldAlert } from "lucide-react"
import ThemeManager from "@/components/app/admin/ThemeManager"
import ProjectManager from "@/components/app/admin/ProjectManager"
import TeamManager from "@/components/app/admin/TeamManager"

type TabType = "projects" | "themes" | "teams"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("teams")

  const tabs = [
    {
      id: "teams" as TabType,
      label: "Équipes & Participants",
      icon: Users,
      color: "from-orange-500 to-rose-500",
    },
    {
      id: "projects" as TabType,
      label: "Projets (Sujets)",
      icon: FolderHeart,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "themes" as TabType,
      label: "Thématiques",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-16">
      {/* Admin Hero Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100 shadow-sm pt-8 pb-6 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Panneau d'Administration</h1>
              <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">
                Supervisez les thèmes, les projets et gérez la constitution des équipes pour le hackathon.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
              Navigation Admin
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13.5px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-orange-400" : "text-slate-400"} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5">
              <LayoutGrid size={120} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Statut Global</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Désignez le capitaine et associez les participants intéressés d'un seul clic.
            </p>
          </div>
        </aside>

        {/* Content Section */}
        <main className="lg:col-span-3 bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-sm">
          {activeTab === "themes" && <ThemeManager />}
          {activeTab === "projects" && <ProjectManager />}
          {activeTab === "teams" && <TeamManager />}
        </main>
      </div>
    </div>
  )
}
