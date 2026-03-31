import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Strona główna" },
  { to: "/o-nas", label: "O nas" },
  { to: "/oferta", label: "Oferta" },
  { to: "/spot", label: "Spot" },
  { to: "/galeria", label: "Galeria" },
  { to: "/wyjazdy", label: "Wyjazdy" },
  { to: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="container mx-auto">
        <nav className="section-shell px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-4" onClick={() => setIsOpen(false)}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(145deg,rgba(255,247,233,0.95)_0%,rgba(226,242,248,0.92)_100%)] shadow-[0_10px_30px_rgba(15,32,46,0.14)]">
                <img
                  alt="Deskorelax logo"
                  className="h-12 w-12 object-contain"
                  src="/deskorelax-logo.png"
                />
              </span>
              <div className="hidden min-[430px]:block">
                <p className="font-heading text-lg font-semibold tracking-[-0.04em] text-foreground">Deskorelax</p>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/50">
                  Windsurfing & żeglarstwo
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn("nav-pill", active && "nav-pill-active")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="https://www.instagram.com/deskorelax/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary h-11 px-4"
                aria-label="Instagram Deskorelax"
              >
                <Instagram size={18} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="cta-secondary h-11 px-4 lg:hidden"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isOpen ? (
            <div className="mt-4 grid gap-3 border-t border-foreground/10 pt-4 lg:hidden">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn("nav-pill justify-between px-5 py-3", active && "nav-pill-active")}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary flex-1"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
