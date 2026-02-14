import Layout from "@/components/Layout";
import { MapPin, Wind, Thermometer, Waves } from "lucide-react";

const Spot = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-6">
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

            {/* Map placeholder */}
            <div className="w-full h-64 md:h-80 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border">
              <div className="text-center">
                <MapPin size={40} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Mapa zostanie dodana wkrótce</p>
              </div>
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
