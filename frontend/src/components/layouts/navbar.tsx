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

interface NavbarProps {
  activeHref?: string;
}

export default function Navbar({ activeHref = "/" }: NavbarProps) {
  const [active, setActive] = useState(activeHref);

  return (
    <header className="w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
              <Hexagon className="w-4 h-4 text-background fill-background stroke-none" />
            </div>
            <span
              className="font-black text-[17px] tracking-tight leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Hack<span className="text-orange-500">X</span>
            </span>
          </a>

          {/* Nav links */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.href;

                if (item.children) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-9 px-3 text-[13.5px] font-medium gap-1.5 rounded-lg",
                          "text-muted-foreground hover:text-foreground",
                          "data-[state=open]:bg-accent",
                          isActive && "bg-foreground text-background hover:bg-foreground hover:text-background"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {item.label}
                        {item.badge && (
                          <Badge className="ml-1 h-4 px-1.5 text-[9px] font-bold bg-orange-500 hover:bg-orange-500 text-white rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-56 p-2 space-y-0.5">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.href}
                                  className="block rounded-md px-3 py-2 hover:bg-accent transition-colors"
                                >
                                  <p className="text-sm font-medium leading-none mb-1">{child.label}</p>
                                  <p className="text-xs text-muted-foreground leading-snug">{child.description}</p>
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
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
            <Button variant="ghost" size="sm" className="text-[13px] font-medium">
              <Link to="/login">Se connecter</Link>
            </Button>
            <Button
              size="sm"
              className="text-[13px] font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4"
            >
              <Link to="/register">S'inscrire</Link>
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}