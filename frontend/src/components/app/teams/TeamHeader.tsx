import {  Sparkles } from "lucide-react"

type Props = {
  hasTeam: boolean
}

const ISI_BLUE = "#0055A4"

const TeamHeader = ({ hasTeam }: Props) => {
  return (
    <div className="mb-10">
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${ISI_BLUE}, #003d7a)` }}
        >
          <Sparkles size={12} />
          ISI Innovation Day
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {hasTeam ? "Votre équipe" : "Rejoignez l'aventure"}
      </h1>

      {/* Subtitle */}
      <p className="text-slate-500 mt-2 text-sm md:text-base max-w-2xl leading-relaxed">
        {hasTeam
          ? "Gérez votre équipe, suivez vos membres et préparez-vous pour le hackathon."
          : "Un projet vous inspire ? Créez votre équipe, invitez vos collaborateurs et participez à l'ISI Innovation Day."}
      </p>

      {/* Decorative gradient line */}
      <div
        className="mt-5 h-1 w-16 rounded-full"
        style={{ background: `linear-gradient(90deg, ${ISI_BLUE}, #60a5fa)` }}
      />
    </div>
  )
}

export default TeamHeader