import { useContext, useEffect } from "react"
import { Loader2, Users, Rocket, ArrowRight, Lightbulb, Target, Zap } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"
import useGetTeam from "@/hooks/team/useGetTeam"

import TeamHeader from "@/components/app/teams/TeamHeader"
import TeamOverviewCard from "@/components/app/teams/TeamOverviewCard"
import CreateTeam from "@/components/app/teams/createTeam"

const ISI_BLUE = "#0055A4"

const Team = () => {
  const { user } = useContext(AuthContext)
  const { team, loading, getTeam } = useGetTeam()

  useEffect(() => {
    if (user?.id) getTeam()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-slate-400 gap-3 bg-slate-50">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: `${ISI_BLUE}10` }}
        >
          <Loader2 className="animate-spin" size={22} style={{ color: ISI_BLUE }} />
        </div>
        <p className="text-sm font-medium">Chargement de votre espace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-10 py-8">
      <TeamHeader hasTeam={!!team?.data} />

      {team?.data ? (
        <TeamOverviewCard team={team.data} />
      ) : (
        <NoTeamSection />
      )}
    </div>
  )
}

/* ── Empty State: No Team ─────────────────────────────────── */
const NoTeamSection = () => {
  return (
    <div className="space-y-6">
      {/* ── Hero CTA Card ── */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm">
        {/* Top gradient accent */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${ISI_BLUE}, #60a5fa, #818cf8)` }}
        />

        <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${ISI_BLUE}, #3b82f6)` }}
            >
              <Users size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                Prêt à former votre équipe ?
              </h2>
              <p className="text-slate-500 text-sm mt-1.5 max-w-md leading-relaxed">
                Donnez un nom à votre équipe, associez-la à un projet et invitez vos
                collaborateurs pour participer au hackathon.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <CreateTeam />
          </div>
        </div>
      </div>

      {/* ── Steps / How it works ── */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: <Lightbulb size={20} />,
            title: "1. Choisissez un projet",
            desc: "Parcourez les thèmes proposés et trouvez celui qui vous inspire.",
            gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
          },
          {
            icon: <Target size={20} />,
            title: "2. Créez votre équipe",
            desc: "Nommez votre équipe et associez-la au projet choisi.",
            gradient: `linear-gradient(135deg, ${ISI_BLUE}, #3b82f6)`,
          },
          {
            icon: <Zap size={20} />,
            title: "3. Invitez vos coéquipiers",
            desc: "Ajoutez jusqu'à 3 membres pour compléter votre équipe.",
            gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm"
              style={{ background: step.gradient }}
            >
              {step.icon}
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{step.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Motivation Banner ── */}
      <div
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 text-white"
        style={{ background: `linear-gradient(135deg, ${ISI_BLUE}, #1e40af)` }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <Rocket size={22} />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="font-bold text-lg">L'innovation commence ici</h3>
          <p className="text-blue-100 text-sm mt-1 max-w-lg">
            Chaque grande idée a besoin d'une équipe solide. Formez la vôtre et
            relevez le défi de l'ISI Innovation Day.
          </p>
        </div>
        <div className="shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white transition-colors cursor-default">
            Commencer maintenant
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team