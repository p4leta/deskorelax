import Layout from "@/components/Layout";
import { MapPin } from "lucide-react";

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

          <div className="mt-8 bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="font-heading text-xl font-semibold mb-4 text-center">Warunki wiatrowe (Windy)</h3>
            <div className="overflow-hidden rounded-xl border border-border bg-white/20">
              <iframe
                width="650"
                height="450"
                src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0C&metricWind=kt&zoom=11&overlay=wind&product=ecmwf&level=surface&lat=53.872&lon=20.023&detailLat=53.908&detailLon=20.024&detail=true"
                frameBorder="0"
                className="w-full"
                title="Windy - warunki wiatrowe"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Spot;
