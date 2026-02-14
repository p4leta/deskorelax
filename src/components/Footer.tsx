import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-3">🏄 Deskorelax</h3>
            <p className="text-sm opacity-80">
              Szkoła windsurfingowa — relaks na desce, przygoda na wodzie!
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold mb-3">Nawigacja</h4>
            <div className="flex flex-col gap-1 text-sm">
              <Link to="/o-nas" className="opacity-80 hover:opacity-100 transition-opacity">O nas</Link>
              <Link to="/oferta" className="opacity-80 hover:opacity-100 transition-opacity">Oferta</Link>
              <Link to="/spot" className="opacity-80 hover:opacity-100 transition-opacity">Spot</Link>
              <Link to="/galeria" className="opacity-80 hover:opacity-100 transition-opacity">Galeria</Link>
              <Link to="/kontakt" className="opacity-80 hover:opacity-100 transition-opacity">Kontakt</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-3">Kontakt</h4>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Phone size={14} /> +48 123 456 789
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Mail size={14} /> kontakt@deskorelax.pl
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <MapPin size={14} /> Polska
              </div>
              <a
                href="https://www.instagram.com/deskorelax/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity mt-1"
              >
                <Instagram size={14} /> @deskorelax
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Deskorelax. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
