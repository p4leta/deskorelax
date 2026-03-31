import Layout from "@/components/Layout";
import { Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="subpage-title-kretowiny mb-6 text-center text-4xl font-extrabold md:text-5xl">O nas</h1>
          <div className="mb-12 rounded-xl border border-border bg-card p-8 md:p-12">
            <h2 className="mb-4 font-heading text-2xl font-bold">Nasza historia</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Jesteśmy trójką przyjaciół, których połączyła jedna rzecz - ogromna zajawka do sportów wodnych.
              Deskorelax powstał nad naszym jeziorem ponad 15 lat temu, zupełnie naturalnie - jako projekt dla
              znajomych, wspólne pływanie, wakacje spędzane nad wodą i klimat, którego nie da się stworzyć na siłę.
              Chodziło po prostu o to, żeby spędzać najlepsze lato w życiu: dużo wody, dużo wiatru, dobra ekipa i
              totalny chill.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Z czasem z tej pasji powstała szkółka, ale jedno się nie zmieniło - wciąż robimy to z dokładnie takim
              samym podejściem. Bez nadęcia, za to z ogromną energią i miłością do wody. Chcemy pokazać ludziom, jak
              wciągające mogą być sporty wodne i jak wiele radości daje pływanie, wiatr w żaglu i letnie dni spędzone
              nad jeziorem.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Do dziś Deskorelax to przede wszystkim ludzie, klimat i wspólna zajawka.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Heart size={28} />, title: "Pasja", desc: "Windsurfing to nasza miłość. Dzielimy się nią z radością." },
              {
                icon: <Award size={28} />,
                title: "Doświadczenie",
                desc: "Wykwalifikowani instruktorzy z certyfikatami i latami praktyki.",
              },
              {
                icon: <Users size={28} />,
                title: "Społeczność",
                desc: "Budujemy społeczność surferów, którzy się wspierają i dobrze bawią.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
