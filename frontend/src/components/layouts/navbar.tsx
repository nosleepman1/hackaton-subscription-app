"use client";

import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { navItems, mobileNavItems } from "./navItems";
import Logo from "./Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AuthContext } from "@/context/AuthContext";


interface NavbarProps {
  activeHref?: string;
}



export default function Navbar({ activeHref = "/" }: NavbarProps) {

  const [active, setActive] = useState(activeHref);
  const {isAuthenticated, logout} = useContext(AuthContext);


  return (
    <>
      {/* DESKTOP NAVBAR  */}
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

            <Logo />
       

            {/* Nav links */}
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.href;
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
            {!isAuthenticated ? (
            <div  className="flex items-center gap-2 shrink-0">
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
            ) : (
                <div className="flex items-center gap-2">
                    <Link
                        to="/profile"
                        className="text-[12px] font-medium text-blue-100 px-3 py-1.5 rounded-lg"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                        Profile
                    </Link>

                    <Button
                        onClick={logout}
                        className="text-[12px] bg-red-500 text-white font-medium px-3 py-1.5 rounded-lg hover:text-white hover:bg-red-600"
                    >
                        Logout
                    </Button>
                </div>
            )}

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
            <Logo />
           

            {/* Actions mobile */}
            {!isAuthenticated ? (
              <div  className="flex items-center gap-2 shrink-0">
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
              ) : (
                <div className="flex items-center gap-2">
                    <Link
                        to="/profile"
                        className="text-[12px] font-medium text-blue-100 px-3 py-1.5 rounded-lg"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        Profile
                    </Link>

                    <Link
                        to="/logout"
                        className="text-[12px] font-medium text-blue-100 px-3 py-1.5 rounded-lg"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        Logout
                    </Link>
                  </div>
              )}

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