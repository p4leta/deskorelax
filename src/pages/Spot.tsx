import Layout from "@/components/Layout";
import { MapPin, Wind, Thermometer, Waves } from "lucide-react";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";
const googleMapsEmbed = "https://www.google.com/maps?q=Deskorelax%20Kretowiny&output=embed";

const Spot = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="subpage-title-kretowiny text-4xl md:text-5xl font-extrabold text-center mb-6">
            Nasz Spot 📍
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Idealne miejsce do nauki i zabawy na wodzie.
          </p>

          <div className="bg-card rounded-xl border border-border p-8 md:p-12 mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin size={24} className="text-secondary" /> Lokalizacja
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nasz spot to doskonałe miejsce zarówno dla początkujących, jak i zaawansowanych windsurferów.
              Płytka woda, stabilny wiatr i piaszczyste dno tworzą idealne warunki do nauki i rozwijania umiejętności.
            </p>

            <div className="overflow-hidden rounded-xl border border-border shadow-lg bg-white/20">
              <iframe
                title="Mapa Google Deskorelax"
                src={googleMapsEmbed}
                className="w-full h-64 md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-4">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/20 px-5 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-white/30"
              >
                <MapPin size={16} /> Otwórz w Google Maps
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Wind size={24} />, title: "Wiatr", desc: "Stabilne warunki wiatrowe, idealne do nauki" },
              { icon: <Waves size={24} />, title: "Akwen", desc: "Płytka woda z piaszczystym dnem" },
              { icon: <Thermometer size={24} />, title: "Sezon", desc: "Od maja do września — najlepsze miesiące na surfing" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 text-secondary mb-3">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Spot;
