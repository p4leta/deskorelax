import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";

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
    <header className="sticky top-0 z-40 px-1.5 pt-1.5 md:px-4 md:pt-4">
      <div className="container mx-auto">
        <nav className="section-shell px-2 py-2 md:px-6 md:py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,32,46,0.14)] md:h-14 md:w-14">
                <img
                  alt="Deskorelax logo"
                  className="h-9 w-9 object-contain md:h-12 md:w-12"
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
                <InstagramBrandIcon size={18} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="cta-secondary h-9 px-3 md:h-11 md:px-4 lg:hidden"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isOpen ? (
            <div className="mt-2.5 grid gap-2 border-t border-foreground/10 pt-2.5 lg:hidden">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn("nav-pill justify-between px-3.5 py-2.5", active && "nav-pill-active")}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-2.5 pt-1.5 sm:flex-row">
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary flex-1"
                >
                  <InstagramBrandIcon size={18} />
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
