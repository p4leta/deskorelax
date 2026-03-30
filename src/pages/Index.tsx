import { Link } from "react-router-dom";
import { Instagram, Sun, Waves, Wind } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: <Wind size={36} />,
    title: "Doświadczeni instruktorzy",
    desc: "Nasz zespół to pasjonaci windsurfingu z wieloletnim doświadczeniem.",
  },
  {
    icon: <Waves size={36} />,
    title: "Idealny spot",
    desc: "Doskonałe warunki wiatrowe i bezpieczne akweny dla początkujących i zaawansowanych.",
  },
  {
    icon: <Sun size={36} />,
    title: "Luźna atmosfera",
    desc: "U nas relaks jest najważniejszy - surfing to przede wszystkim zabawa!",
  },
];

const Index = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
            <img
              alt="Deskorelax"
              className="mb-6 shrink-0 md:mb-8"
              style={{ width: "clamp(102px, 15.2vw, 161px)" }}
              src="/lovable-uploads/2559f7b4-f1f8-459a-abdf-7b73bdb3729c.png"
            />

            <img
              alt="Szkoła windsurfingu i żeglarstwa Kretowiny"
              className="mb-8 h-auto md:mb-10"
              style={{ width: "clamp(354px, 69.6vw, 673px)" }}
              src="/hero/kretowiny-wordmark-full.png"
            />

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/oferta"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3 font-semibold text-card-foreground shadow-lg transition-transform hover:scale-105"
              >
                <Wind size={18} /> Sprawdź ofertę
              </Link>
              <a
                href="https://www.instagram.com/deskorelax/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3 font-semibold text-card-foreground shadow-lg transition-colors hover:bg-card/90"
              >
                <Instagram size={18} /> Śledź nas na IG
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold md:text-4xl">
            Dlaczego Deskorelax?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,rgba(223,243,239,0.34)_0%,rgba(183,221,213,0.24)_42%,rgba(24,76,74,0.18)_100%)] py-16 backdrop-blur-[1px]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">Gotowy na przygodę?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Dołącz do naszej szkoły i naucz się windsurfingu w najlepszej atmosferze!
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            Skontaktuj się z nami
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
