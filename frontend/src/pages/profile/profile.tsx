import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"

// ─── Modals ────────────────────────────────────────────────────────────────

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,30,80,0.45)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md mx-4"
                onClick={e => e.stopPropagation()}
                style={{
                    background: "linear-gradient(145deg, #ffffff 0%, #f0f6ff 100%)",
                    borderRadius: "24px",
                    boxShadow: "0 32px 80px rgba(37,99,235,0.18), 0 2px 8px rgba(37,99,235,0.08)",
                    border: "1.5px solid rgba(147,197,253,0.5)",
                    animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)"
                }}
            >
                {children}
            </div>
        </div>
    )
}

const EditProfileModal = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: any }) => {
    const [form, setForm] = useState({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        grade: user?.grade || "",
        filiere: user?.filiere || "",
        matricule: user?.matricule || "",
    })

    const fields = [
        { key: "firstname", label: "Prénom", type: "text" },
        { key: "lastname", label: "Nom", type: "text" },
        { key: "email", label: "Adresse email", type: "email" },
        { key: "grade", label: "Grade", type: "text" },
        { key: "filiere", label: "Filière", type: "text" },
        { key: "matricule", label: "Matricule", type: "text" },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-8">
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem", fontWeight: 700, color: "#1e3a8a", letterSpacing: "-0.01em" }}>
                            Modifier le profil
                        </h2>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>Mettez à jour vos informations personnelles</p>
                    </div>
                    <button onClick={onClose} style={{ background: "#eff6ff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", fontSize: "1.1rem", transition: "background 0.2s" }}
                        onMouseOver={e => (e.currentTarget.style.background = "#dbeafe")}
                        onMouseOut={e => (e.currentTarget.style.background = "#eff6ff")}>
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "#3b82f6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                                {f.label}
                            </label>
                            <input
                                type={f.type}
                                value={(form as any)[f.key]}
                                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                style={{
                                    width: "100%", padding: "10px 14px", borderRadius: "12px",
                                    border: "1.5px solid #bfdbfe", background: "#f8fbff",
                                    color: "#1e3a8a", fontSize: "0.92rem", outline: "none",
                                    transition: "border 0.2s, box-shadow 0.2s", boxSizing: "border-box"
                                }}
                                onFocus={e => { e.target.style.border = "1.5px solid #3b82f6"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)" }}
                                onBlur={e => { e.target.style.border = "1.5px solid #bfdbfe"; e.target.style.boxShadow = "none" }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-7">
                    <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "1.5px solid #bfdbfe", background: "white", color: "#3b82f6", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseOver={e => (e.currentTarget.style.background = "#eff6ff")}
                        onMouseOut={e => (e.currentTarget.style.background = "white")}>
                        Annuler
                    </button>
                    <button style={{ flex: 2, padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", color: "white", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(37,99,235,0.3)", transition: "transform 0.15s, box-shadow 0.15s" }}
                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)" }}
                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(37,99,235,0.3)" }}>
                        Enregistrer les modifications
                    </button>
                </div>
            </div>
        </Modal>
    )
}

const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [form, setForm] = useState({ current: "", next: "", confirm: "" })
    const [show, setShow] = useState({ current: false, next: false, confirm: false })

    const fields = [
        { key: "current", label: "Mot de passe actuel" },
        { key: "next", label: "Nouveau mot de passe" },
        { key: "confirm", label: "Confirmer le nouveau mot de passe" },
    ]

    const strength = form.next.length === 0 ? 0 : form.next.length < 6 ? 1 : form.next.length < 10 ? 2 : 3
    const strengthConfig = [
        { label: "", color: "transparent" },
        { label: "Faible", color: "#ef4444" },
        { label: "Moyen", color: "#f59e0b" },
        { label: "Fort", color: "#22c55e" },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-8">
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem", fontWeight: 700, color: "#1e3a8a", letterSpacing: "-0.01em" }}>
                            Changer le mot de passe
                        </h2>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>Sécurisez votre compte avec un nouveau mot de passe</p>
                    </div>
                    <button onClick={onClose} style={{ background: "#eff6ff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", fontSize: "1.1rem" }}
                        onMouseOver={e => (e.currentTarget.style.background = "#dbeafe")}
                        onMouseOut={e => (e.currentTarget.style.background = "#eff6ff")}>
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "#3b82f6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                                {f.label}
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={(show as any)[f.key] ? "text" : "password"}
                                    value={(form as any)[f.key]}
                                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    style={{
                                        width: "100%", padding: "10px 42px 10px 14px", borderRadius: "12px",
                                        border: "1.5px solid #bfdbfe", background: "#f8fbff",
                                        color: "#1e3a8a", fontSize: "0.92rem", outline: "none",
                                        transition: "border 0.2s, box-shadow 0.2s", boxSizing: "border-box"
                                    }}
                                    onFocus={e => { e.target.style.border = "1.5px solid #3b82f6"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)" }}
                                    onBlur={e => { e.target.style.border = "1.5px solid #bfdbfe"; e.target.style.boxShadow = "none" }}
                                />
                                <button
                                    onClick={() => setShow(prev => ({ ...prev, [f.key]: !(prev as any)[f.key] }))}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#93c5fd", fontSize: "0.9rem" }}>
                                    {(show as any)[f.key] ? "hide" : "show"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {form.next.length > 0 && (
                    <div style={{ marginTop: "12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, background: i <= strength ? strengthConfig[strength].color : "#e2e8f0", transition: "background 0.3s" }} />
                            ))}
                        </div>
                        <p style={{ fontSize: "0.75rem", color: strengthConfig[strength].color, marginTop: 4, fontWeight: 600 }}>
                            {strengthConfig[strength].label}
                        </p>
                    </div>
                )}

                <div className="flex gap-3 mt-7">
                    <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "1.5px solid #bfdbfe", background: "white", color: "#3b82f6", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseOver={e => (e.currentTarget.style.background = "#eff6ff")}
                        onMouseOut={e => (e.currentTarget.style.background = "white")}>
                        Annuler
                    </button>
                    <button style={{ flex: 2, padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", color: "white", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(37,99,235,0.3)", transition: "transform 0.15s, box-shadow 0.15s" }}
                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)" }}
                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(37,99,235,0.3)" }}>
                        Appliquer
                    </button>
                </div>
            </div>
        </Modal>
    )
}

// ─── Main Profile Component ─────────────────────────────────────────────────

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [editOpen, setEditOpen] = useState(false)
    const [pwdOpen, setPwdOpen] = useState(false)

    const initials = user?.name
        ? user.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
        : "??"

    const infoFields = [
        { label: "Nom complet", value: user?.firstname + " " + user?.lastname },
        { label: "Email", value: user?.email },
        { label: "Rôle", value: user?.role },
        ...(user?.grade ? [{ label: "Grade", value: user.grade }] : []),
        ...(user?.filiere ? [{ label: "Filière", value: user.filiere }] : []),
        ...(user?.matricule ? [{ label: "Matricule", value: user.matricule }] : []),
    ]

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.88) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes avatarPop {
                    0% { transform: scale(0.7); opacity: 0; }
                    70% { transform: scale(1.07); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>

            <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0f6ff 0%, #ffffff 50%, #e8f0fe 100%)", padding: "40px 24px 60px" }}>

                {/* ── Page Title ── */}
                <div style={{ maxWidth: 720, margin: "0 auto", animation: "fadeUp 0.5s ease both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                        <div style={{ width: 4, height: 28, borderRadius: 99, background: "linear-gradient(180deg, #3b82f6, #1d4ed8)" }} />
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a8a", margin: 0, letterSpacing: "-0.02em" }}>
                            Mon Profil
                        </h1>
                    </div>

                    {/* ── Hero Card ── */}
                    <div style={{
                        background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
                        borderRadius: "28px",
                        padding: "40px 36px",
                        display: "flex",
                        alignItems: "center",
                        gap: 28,
                        boxShadow: "0 20px 60px rgba(37,99,235,0.3), 0 4px 16px rgba(37,99,235,0.2)",
                        position: "relative",
                        overflow: "hidden",
                        animation: "fadeUp 0.5s 0.1s ease both",
                        marginBottom: 24,
                    }}>
                        {/* Decorative circles */}
                        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                        <div style={{ position: "absolute", bottom: -30, right: 80, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                        <div style={{ position: "absolute", top: 20, right: 120, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />

                        {/* Avatar */}
                        <div style={{
                            width: 88, height: 88, borderRadius: "50%", flexShrink: 0,
                            background: "rgba(255,255,255,0.15)",
                            border: "3px solid rgba(255,255,255,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "2rem", fontWeight: 700, color: "white",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            animation: "avatarPop 0.6s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                        }}>
                            {initials}
                        </div>

                        {/* Name & role */}
                        <div style={{ flex: 1, position: "relative" }}>
                            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                Compte actif
                            </p>
                            <h2 style={{ margin: "4px 0 6px", fontSize: "1.6rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                                {user?.name || "Utilisateur"}
                            </h2>
                            <span style={{
                                display: "inline-block", padding: "4px 14px", borderRadius: 99,
                                background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                                color: "rgba(255,255,255,0.95)", fontSize: "0.78rem", fontWeight: 600,
                                border: "1px solid rgba(255,255,255,0.25)", letterSpacing: "0.04em"
                            }}>
                                {user?.role || "—"}
                            </span>
                        </div>
                    </div>

                    {/* ── Info Grid ── */}
                    <div style={{
                        background: "white",
                        borderRadius: "24px",
                        border: "1.5px solid rgba(147,197,253,0.4)",
                        boxShadow: "0 8px 32px rgba(37,99,235,0.08)",
                        overflow: "hidden",
                        animation: "fadeUp 0.5s 0.2s ease both",
                        marginBottom: 20,
                    }}>
                        <div style={{ padding: "22px 28px 14px", borderBottom: "1px solid #eff6ff" }}>
                            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1e3a8a" }}>
                                Informations personnelles
                            </h3>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                            {infoFields.map((field, i) => (
                                <div key={i} style={{
                                    padding: "18px 28px",
                                    borderBottom: i < infoFields.length - 2 ? "1px solid #f0f7ff" : "none",
                                    borderRight: i % 2 === 0 ? "1px solid #f0f7ff" : "none",
                                }}>
                                    <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 600, color: "#93c5fd", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>
                                        {field.label}
                                    </p>
                                    <p style={{ margin: 0, fontSize: "0.96rem", fontWeight: 500, color: "#1e3a8a" }}>
                                        {field.value || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Non renseigné</span>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Action Buttons ── */}
                    <div style={{ display: "flex", gap: 14, animation: "fadeUp 0.5s 0.3s ease both" }}>
                        <button
                            onClick={() => setEditOpen(true)}
                            style={{
                                flex: 1, padding: "14px 20px", borderRadius: "16px",
                                border: "none", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                color: "white", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                boxShadow: "0 6px 20px rgba(37,99,235,0.28)",
                                transition: "transform 0.18s, box-shadow 0.18s",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(37,99,235,0.38)" }}
                            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.28)" }}>
                            Modifier le profil
                        </button>
                        <button
                            onClick={() => setPwdOpen(true)}
                            style={{
                                flex: 1, padding: "14px 20px", borderRadius: "16px",
                                border: "1.5px solid #bfdbfe", background: "white",
                                color: "#1d4ed8", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                boxShadow: "0 4px 14px rgba(37,99,235,0.08)",
                                transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(37,99,235,0.14)" }}
                            onMouseOut={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,99,235,0.08)" }}>
                            Modifier mot de passe
                        </button>
                    </div>
                </div>
            </div>

            <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} user={user} />
            <ChangePasswordModal isOpen={pwdOpen} onClose={() => setPwdOpen(false)} />
        </>
    )
}

export default Profile