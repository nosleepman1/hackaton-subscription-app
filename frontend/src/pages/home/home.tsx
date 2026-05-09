import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGetProjects } from "@/hooks/project/useGetProject"
import { ArrowRight, Users, Sparkles, ChevronDown, Heart } from "lucide-react"

const INITIAL_DISPLAY_COUNT = 6

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [interested, setInterested] = useState(false)

 

  return (
    <article
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Colored top stripe */}
      <div className={`h-1.5 w-full `} />

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Avatar + title */}
        <div className="flex items-start gap-3">
         
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {project.description || "Aucune description disponible."}
        </p>

        {/* Tags / meta */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
          <button
            onClick={() => setInterested((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              interested
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
            }`}
          >
            <Heart
              size={13}
              className={interested ? "fill-rose-500 text-rose-500" : ""}
            />
            {interested ? "Intéressé(e)" : "M'intéresser"}
          </button>

          <button className="ml-auto flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-orange-500 transition-colors">
            Voir plus
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </article>
  )
}

const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white animate-pulse">
    <div className="h-1.5 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div className="h-4 w-36 bg-slate-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
        <div className="h-3 bg-slate-100 rounded w-4/6" />
      </div>
      <div className="h-8 bg-slate-100 rounded-lg w-28 mt-2" />
    </div>
  </div>
)

const Home = () => {
  const { data, isLoading, isError, error } = useGetProjects()
  const [showAll, setShowAll] = useState(false)

  const projects = data?.data || []
  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMore = projects.length > INITIAL_DISPLAY_COUNT

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="px-4 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-orange-600 tracking-wide">
              ISI Innovations Day
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
            La plateforme des{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              hackathons
            </span>{" "}
            ISI
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto">
            Participez aux meilleurs hackathons, formez votre équipe et
            construisez des projets innovants.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200 gap-2"
            >
              <Sparkles size={16} />
              Je m'inscris à un projet
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 gap-2"
            >
              <Users size={16} />
              Créer une équipe
            </Button>
          </div>
        </div>
      </section>

      {/* ── Projects section ─────────────────────────────────── */}
      <section className="px-4 pb-24 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Les projets
            </h2>
            {!isLoading && !isError && (
              <p className="text-slate-500 text-sm mt-1">
                {projects.length} projet{projects.length !== 1 ? "s" : ""}{" "}
                disponible{projects.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          {hasMore && !showAll && (
            <span className="text-xs text-slate-400 hidden sm:block">
              Affichage de {INITIAL_DISPLAY_COUNT} sur {projects.length}
            </span>
          )}
        </div>

        {/* Error state */}
        {isError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-600">
            <p className="font-semibold">Une erreur est survenue</p>
            <p className="text-sm mt-1">{error?.message}</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: INITIAL_DISPLAY_COUNT }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : displayedProjects.map((project: any, index: number) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
        </div>

        {/* Empty state */}
        {!isLoading && !isError && projects.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-3">🚀</p>
            <p className="font-semibold text-lg text-slate-600">
              Aucun projet pour l'instant
            </p>
            <p className="text-sm">Revenez bientôt !</p>
          </div>
        )}

        {/* Show more */}
        {hasMore && !isLoading && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll((v) => !v)}
              className="gap-2 border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {showAll ? (
                "Voir moins"
              ) : (
                <>
                  Voir tous les projets ({projects.length - INITIAL_DISPLAY_COUNT} de plus)
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home