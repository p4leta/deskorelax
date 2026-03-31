import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";

const Footer = () => {
  return (
    <footer className="relative z-10 px-4 pb-6 pt-12 md:pb-8 md:pt-16">
      <div className="container mx-auto">
        <div className="section-shell-dark surface-ocean overflow-hidden px-6 py-10 md:px-10 md:py-12">
          <div className="ambient-blob -right-10 top-6 h-44 w-44 bg-sunset/30" />
          <div className="ambient-blob bottom-0 left-6 h-36 w-36 bg-primary/30" />
          <div className="ambient-blob left-[38%] top-[10%] h-28 w-28 bg-ocean-light/25" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.8fr)]">
            <div className="space-y-5">
              <span className="eyebrow p-2">
                <img
                  alt="Deskorelax logo"
                  className="h-14 w-auto"
                  src="/deskorelax-logo.png"
                />
              </span>
              <div className="space-y-4">
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/oferta" className="cta-inverse">
                  Zobacz ofertę
                </Link>
                <Link to="/kontakt" className="cta-secondary">
                  Napisz do nas
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Nawigacja</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-white/76">
                <Link to="/o-nas" className="hover:text-white">
                  O nas
                </Link>
                <Link to="/oferta" className="hover:text-white">
                  Oferta
                </Link>
                <Link to="/spot" className="hover:text-white">
                  Spot
                </Link>
                <Link to="/galeria" className="hover:text-white">
                  Galeria
                </Link>
                <Link to="/wyjazdy" className="hover:text-white">
                  Wyjazdy
                </Link>
                <Link to="/kontakt" className="hover:text-white">
                  Kontakt
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Kontakt</p>
              <div className="space-y-4 text-sm text-white/76">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-white/78" />
                  <span>+48 696 246 459</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 text-white/78" />
                  <span>deskorelaxkretowiny@gmail.com</span>
                </div>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white"
                >
                  <MapPin size={16} className="mt-0.5 text-white/78" />
                  <span>Kretowiny 28F, 14-300 Kretowiny</span>
                </a>
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <Instagram size={16} className="text-white/78" />
                  <span>@deskorelax</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Deskorelax. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
