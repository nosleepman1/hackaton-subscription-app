import { Rocket, Crown, Users, Hash } from "lucide-react"
import TeamMembersList from "./TeamMembersList"
import AddMemberModal from "./AddMemberModal"

type Props = {
  team: any
  onMemberAdded?: () => void
}

const ISI_BLUE = "#0055A4"

const TeamOverviewCard = ({ team, onMemberAdded }: Props) => {
  const validMembers = (team.members || []).filter((m: any) => m.teamMate)
  const spotsLeft = 4 - validMembers.length

  return (
    <div className="space-y-6">
      {/* ── Team Info Card ── */}
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
      >
        {/* Top gradient accent */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${ISI_BLUE}, #60a5fa, #818cf8)` }}
        />

        <div className="p-6 md:p-8">
          {/* Team name + badge row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: `${ISI_BLUE}12` }}
              >
                <Crown size={20} style={{ color: ISI_BLUE }} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {team.team.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Hash size={11} />
                  Équipe #{team.team.id}
                </p>
              </div>
            </div>

            {/* Members count badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium self-start sm:self-auto"
              style={{
                background: `${ISI_BLUE}10`,
                color: ISI_BLUE,
              }}
            >
              <Users size={13} />
              {validMembers.length}/4 membres
            </div>
          </div>

          {/* Project info */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${ISI_BLUE}10` }}
              >
                <Rocket size={16} style={{ color: ISI_BLUE }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Projet associé
                </p>
                <p className="font-semibold text-slate-800 text-sm">
                  {team.team.project?.name}
                </p>
                {team.team.project?.description && (
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-lg">
                    {team.team.project.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Members Section ── */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Membres de l'équipe</h3>
            <p className="text-xs text-slate-400 mt-1">
              {spotsLeft > 0
                ? `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`
                : "Équipe complète"}
            </p>
          </div>

          {spotsLeft > 0 && <AddMemberModal onMemberAdded={onMemberAdded} />}
        </div>

        {validMembers.length > 0 ? (
          <TeamMembersList members={validMembers} onRefresh={onMemberAdded} />
        ) : (
          <div className="text-center py-10 text-slate-400">
            <Users size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">Aucun membre pour l'instant</p>
            <p className="text-xs mt-1">Ajoutez des coéquipiers pour compléter votre équipe.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamOverviewCard