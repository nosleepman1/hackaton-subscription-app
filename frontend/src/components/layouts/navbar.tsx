"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  LayoutDashboard,
  Zap,
  Users,
  User,
  CalendarDays,
  BookOpen,
  Hexagon,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Hackathons",
    href: "/hackathons",
    icon: Zap,
    badge: 3,
    children: [
      { label: "En cours", href: "/hackathons/active", description: "Hackathons actuellement ouverts" },
      { label: "À venir", href: "/hackathons/upcoming", description: "Prochains événements" },
      { label: "Passés", href: "/hackathons/past", description: "Archives & résultats" },
    ],
  },
  {
    label: "Team",
    href: "/team",
    icon: Users,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: CalendarDays,
  },
  {
    label: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
];

// Items affichés dans la bottom nav mobile (max 5 pour Instagram-like)
const mobileNavItems = [
  navItems[0], // Home
  navItems[1], // Hackathons
  navItems[2], // Team
  navItems[4], // Schedule
  navItems[3], // Profile
];

interface NavbarProps {
  activeHref?: string;
}

export default function Navbar({ activeHref = "/" }: NavbarProps) {
  const [active, setActive] = useState(activeHref);

  return (
    <>
      {/* ─── DESKTOP NAVBAR (top, visible md+) ─── */}
      <header
        className="hidden md:flex w-full sticky top-0 z-50"
        style={{
          background: "linear-gradient(135deg, #1a3a6b 0%, #1e4d8c 60%, #2563eb 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
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
                Hack<span style={{ color: "#93c5fd" }}>X</span>
              </span>
            </a>

            {/* Nav links */}
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.href;

                  if (item.children) {
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuTrigger
                          className={cn(
                            "h-9 px-3 text-[13.5px] font-medium gap-1.5 rounded-lg transition-all",
                            "text-blue-100 hover:text-white",
                            isActive
                              ? "bg-white text-blue-900 hover:bg-white hover:text-blue-900"
                              : "hover:bg-white/15 data-[state=open]:bg-white/20"
                          )}
                          style={{ background: isActive ? "white" : undefined }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                          {item.badge && (
                            <Badge
                              className="ml-1 h-4 px-1.5 text-[9px] font-bold rounded-full text-white"
                              style={{ background: "#3b82f6", border: "1px solid rgba(255,255,255,0.3)" }}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul
                            className="w-56 p-2 space-y-0.5 rounded-xl shadow-xl"
                            style={{
                              background: "linear-gradient(160deg, #1e3a7a 0%, #1d4ed8 100%)",
                              border: "1px solid rgba(255,255,255,0.15)",
                            }}
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={child.href}
                                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/10"
                                  >
                                    <p className="text-sm font-medium leading-none mb-1 text-white">{child.label}</p>
                                    <p className="text-xs leading-snug" style={{ color: "#93c5fd" }}>{child.description}</p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          onClick={() => setActive(item.href)}
                          className={cn(
                            "flex items-center gap-1.5 h-9 px-3 rounded-lg text-[13.5px] font-medium transition-all",
                            isActive
                              ? "bg-white text-blue-900 font-semibold"
                              : "text-blue-100 hover:text-white hover:bg-white/15"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium text-blue-100 hover:text-white hover:bg-white/15 rounded-lg"
              >
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button
                size="sm"
                className="text-[13px] font-semibold rounded-lg px-4 text-blue-900"
                style={{
                  background: "white",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <Link to="/register">S'inscrire</Link>
              </Button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── MOBILE TOP BAR (logo + actions, visible md-) ─── */}
      <header
        className="flex md:hidden w-full sticky top-0 z-50"
        style={{
          background: "linear-gradient(135deg, #1a3a6b 0%, #2563eb 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 shrink-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Hexagon className="w-3.5 h-3.5 text-white fill-white stroke-none" />
              </div>
              <span
                className="font-black text-[16px] tracking-tight leading-none text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Hack<span style={{ color: "#93c5fd" }}>X</span>
              </span>
            </a>

            {/* Actions mobile */}
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-[12px] font-medium text-blue-100 px-3 py-1.5 rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="text-[12px] font-semibold text-blue-900 px-3 py-1.5 rounded-lg"
                style={{ background: "white" }}
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM NAV (style Instagram, visible md-) ─── */}
      <nav
        className="flex md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(180deg, #1a3a6b 0%, #1e3f7a 100%)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        }}
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;

          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setActive(item.href)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative transition-all"
              style={{ minHeight: 56 }}
            >
              {/* Indicateur actif */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: 28,
                    height: 3,
                    background: "#60a5fa",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              )}

              {/* Icône avec fond actif */}
              <span
                className="relative flex items-center justify-center rounded-xl transition-all"
                style={{
                  width: 36,
                  height: 28,
                  background: isActive ? "rgba(96,165,250,0.18)" : "transparent",
                }}
              >
                <Icon
                  className="w-5 h-5 transition-all"
                  style={{ color: isActive ? "#93c5fd" : "rgba(255,255,255,0.45)" }}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {/* Badge hackathons */}
                {"badge" in item && item.badge && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[9px] font-bold flex items-center justify-center rounded-full text-white"
                    style={{ background: "#3b82f6", border: "1.5px solid #1a3a6b" }}
                  >
                    {item.badge}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className="text-[10px] font-medium leading-none transition-all"
                style={{ color: isActive ? "#93c5fd" : "rgba(255,255,255,0.4)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer pour éviter que le contenu passe sous la bottom nav */}
      <div className="block md:hidden" style={{ height: 56 }} />
    </>
  );
}