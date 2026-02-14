import Layout from "@/components/Layout";
import { Clock, Users, Zap, Star } from "lucide-react";

const offers = [
  {
    icon: <Users size={28} />,
    title: "Kurs dla początkujących",
    desc: "Idealne wprowadzenie do windsurfingu. Nauczysz się podstaw w bezpiecznym środowisku.",
    details: "Szczegóły wkrótce...",
  },
  {
    icon: <Zap size={28} />,
    title: "Kurs zaawansowany",
    desc: "Dla tych, którzy chcą podnieść swoje umiejętności na wyższy poziom.",
    details: "Szczegóły wkrótce...",
  },
  {
    icon: <Clock size={28} />,
    title: "Wynajem sprzętu",
    desc: "Profesjonalny sprzęt windsurfingowy dostępny na godziny lub cały dzień.",
    details: "Szczegóły wkrótce...",
  },
  {
    icon: <Star size={28} />,
    title: "Lekcje indywidualne",
    desc: "Indywidualne podejście i pełna uwaga instruktora tylko dla Ciebie.",
    details: "Szczegóły wkrótce...",
  },
];

const Offer = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-6">
            Oferta 🏄‍♂️
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Sprawdź nasze kursy i usługi — coś dla każdego poziomu zaawansowania!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-8 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 text-secondary mb-4">
                  {offer.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-muted-foreground mb-3">{offer.desc}</p>
                <p className="text-sm text-muted-foreground/70 italic">{offer.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Offer;
