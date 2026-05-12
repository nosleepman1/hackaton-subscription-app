import { motion } from "framer-motion"
import { Users, Rocket, ChevronRight, Loader2 } from "lucide-react"
import CreateTeam from "@/components/app/teams/createTeam"
import { useGetProjects } from "@/hooks/project/useGetProject"
import { Badge } from "@/components/ui/badge"
import useGetTeam from "@/hooks/team/useGetTeam"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/context/AuthContext"

const ISI_BLUE = "#0055A4"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
}

const Team = () => {
  const { data: projects, isLoading, isError } = useGetProjects()
  const { team, loading, getTeam } = useGetTeam()
  const { user } = useContext(AuthContext)


  useEffect(() => {
    if (user?.id) getTeam(user.id)
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400 py-10 justify-center">
        <Loader2 size={16} className="animate-spin" />
        Chargement de votre équipe...
      </div>
    )
  }

  if (team) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Votre équipe
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl text-sm md:text-base">
          Voici les détails de votre équipe
        </p>
        <div className="mt-4">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">{team?.data?.name}</h1>
          <p className="text-gray-500 text-sm">{team?.data?.project?.name}</p>
          <div className="mt-2">

          </div>


        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">

      {/* ── Hero header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: ISI_BLUE }}
          >
            ISI Innovation Day
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Constituez votre équipe
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl text-sm md:text-base">
          Un projet vous inspire ? Vous avez déjà des collaborateurs en tête ?
          Créez votre équipe et rejoignez l'aventure ISI Innovation Day.
        </p>
      </motion.div>

      {/* ── CTA Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-blue-100 bg-white p-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${ISI_BLUE}15` }}
          >
            <Users size={20} style={{ color: ISI_BLUE }} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm md:text-base">
              Prêt à former votre équipe ?
            </p>
            <p className="text-gray-400 text-xs md:text-sm mt-0.5">
              Donnez un nom à votre équipe, associez-la à un projet et invitez vos collaborateurs.
            </p>
          </div>
        </div>
        {/* CreateTeam injecte son propre bouton qui ouvre la modale */}
        <div className="shrink-0">
          <CreateTeam />
        </div>
      </motion.div>

      {/* ── Projets ── */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
      >
        <Rocket size={18} style={{ color: ISI_BLUE }} />
        Projets du hackathon
      </motion.h2>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-10 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Chargement des projets…
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-500 text-center py-10">
          Impossible de charger les projets. Veuillez réessayer.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.data?.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3 cursor-pointer group"
            >
              {/* Barre colorée en haut */}
              <div
                className="h-1 w-10 rounded-full mb-1"
                style={{ backgroundColor: ISI_BLUE }}
              />

              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                  {project.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="text-xs shrink-0"
                  style={{ color: ISI_BLUE }}
                >
                  #{project.id}
                </Badge>
              </div>

              {project.description && (
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              )}

              <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                style={{ color: ISI_BLUE }}
              >
                Créer une équipe sur ce projet
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Team