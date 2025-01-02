import { Hexagon } from "lucide-react"

const Logo = () => (
  <a href="/" className="flex items-center gap-2.5 shrink-0 group">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
    >
      <Hexagon className="w-4 h-4 text-white fill-white stroke-none" />
    </div>
    <span
      className="font-black text-[17px] tracking-tight leading-none text-white"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      ISI<span style={{ color: "#93c5fd" }}>Inov</span>
    </span>
  </a>
)

export default Logo
