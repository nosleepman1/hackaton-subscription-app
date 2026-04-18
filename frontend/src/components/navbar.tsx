import { useMobile } from "@/hooks/useMobile";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/team", label: "Equipe" },
  { to: "/projects", label: "Projets" },
];

const Navbar = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-lg font-bold">
            Logo
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-foreground"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-lg font-bold">
          Logo
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-foreground"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
