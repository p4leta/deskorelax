import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import algarveImg from "@/assets/algarve-trip.jpg";
import { CalendarDays, MapPin } from "lucide-react";

const Trips = () => {
  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 text-foreground">
            Wyjazdy
          </h1>

          {/* Algarve Trip Card */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
            <div className="relative">
              <img
                src={algarveImg}
                alt="Plaża w Algarve, Portugalia – wyjazd surfingowy"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                  Surf Trip – Algarve, Portugalia
                </h2>
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={18} /> Październik 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={18} /> Algarve, Portugalia
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 text-center">
              <p className="text-muted-foreground text-lg mb-6">
                Dołącz do naszego wyjazdu surfingowego na słynne klify Algarve!
                Ciepła woda, idealne fale i niezapomniane widoki czekają na Ciebie.
              </p>
              <Link
                to="/kontakt"
                className="inline-block px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Zapisz się
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trips;
