import Layout from "@/components/Layout";
import { Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-6">
            O nas 🌴
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Poznaj Deskorelax — szkołę windsurfingową, w której pasja spotyka się z relaksem.
          </p>

          <div className="bg-card rounded-xl border border-border p-8 md:p-12 mb-12">
            <h2 className="font-heading text-2xl font-bold mb-4">Nasza historia</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Deskorelax to szkoła windsurfingowa stworzona przez pasjonatów sportów wodnych. Wierzymy, że windsurfing to nie tylko sport — to styl życia. Naszą misją jest dzielenie się tą pasją z każdym, kto chce spróbować swoich sił na desce.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Niezależnie od tego, czy dopiero zaczynasz, czy jesteś doświadczonym surferem — u nas znajdziesz idealne warunki do nauki i doskonalenia swoich umiejętności w luźnej, przyjaznej atmosferze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Heart size={28} />, title: "Pasja", desc: "Windsurfing to nasza miłość. Dzielimy się nią z radością!" },
              { icon: <Award size={28} />, title: "Doświadczenie", desc: "Wykwalifikowani instruktorzy z certyfikatami i latami praktyki." },
              { icon: <Users size={28} />, title: "Społeczność", desc: "Budujemy społeczność surferów, którzy się wspierają i bawią." },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 text-secondary mb-3">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
