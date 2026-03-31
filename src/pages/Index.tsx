import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Sun, Waves, Wind } from "lucide-react";
import Layout from "@/components/Layout";
import heroDeskorelaxSunset from "@/assets/hero-home-new.jpg";
import heroSailingCard from "@/assets/hero-sailing-card.jpg";

const features = [
  {
    icon: <Wind size={28} />,
    title: "Doświadczeni instruktorzy",
    desc: "Uczymy swobodnie i konkretnie, z naciskiem na progres, bezpieczeństwo i dobrą energię na wodzie.",
  },
  {
    icon: <Waves size={28} />,
    title: "Idealny spot",
    desc: "Płytka woda i warunki, które dobrze pracują zarówno dla pierwszych prób, jak i dalszego rozwoju.",
  },
  {
    icon: <Sun size={28} />,
    title: "Luźna atmosfera",
    desc: "Deskorelax to szkoła, ale też klimat wakacyjnego miejsca, do którego chce się wracać.",
  },
];

const featureVariants = [
  {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    title: "text-white",
    desc: "text-white/78",
  },
  {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    title: "text-white",
    desc: "text-white/78",
  },
  {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    title: "text-white",
    desc: "text-white/78",
  },
];

const entryPoints = [
  {
    title: "Kursy i oferta",
    description: "Windsurfing, żeglarstwo, obozy i warianty dopasowane do wieku oraz poziomu zaawansowania.",
    href: "/oferta",
  },
  {
    title: "Poznaj nasz spot",
    description: "Sprawdź, gdzie pływamy, jak wygląda lokalizacja i jakie warunki czekają na miejscu.",
    href: "/spot",
  },
  {
    title: "Zobacz klimat na żywo",
    description: "Galeria i Instagram pokazują to, co dla nas najważniejsze: ludzi, ruch, lato i wodę.",
    href: "/galeria",
  },
];

const Index = () => {
  return (
    <Layout>
      <section className="section-frame overflow-hidden px-2 pb-8 pt-3 md:px-4 md:pt-12 md:pb-20">
        <div className="container mx-auto">
          <div className="media-frame min-h-[420px] md:min-h-[640px]">
            <img
              src={heroDeskorelaxSunset}
              alt="Deskorelax przy jeziorze o zachodzie słońca"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,42,0.18)_0%,rgba(12,28,42,0.42)_100%)]" />
            <div className="ambient-blob right-12 top-10 h-36 w-36 bg-sunset/25" />
            <div className="ambient-blob bottom-10 left-10 h-44 w-44 bg-ocean-light/25" />

            <div className="relative flex min-h-[420px] flex-col items-center justify-center px-3 py-6 text-center md:min-h-[640px] md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="space-y-6 md:space-y-8">
                <img
                  alt="Szkoła windsurfingu i żeglarstwa Kretowiny"
                  className="h-auto w-full max-w-[46rem] drop-shadow-[0_16px_40px_rgba(13,27,39,0.34)]"
                  src="/hero/kretowiny-wordmark-full.png"
                />

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link to="/oferta" className="cta-primary">
                    <Wind size={18} />
                    Sprawdź ofertę
                  </Link>
                  <a
                    href="https://www.instagram.com/deskorelax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-secondary"
                  >
                    <Instagram size={18} />
                    Zobacz Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-2 py-3 md:px-4 md:py-10">
        <div className="container mx-auto">
          <div className="grid gap-3 md:grid-cols-3 md:gap-5">
            {features.map((item, index) => {
              const variant = featureVariants[index];

              return (
              <article key={item.title} className={`${variant.card} min-h-[200px] p-4 md:min-h-[260px] md:p-7`}>
                <div className={`mb-4 h-12 w-12 md:mb-7 md:h-16 md:w-16 ${variant.icon}`}>
                  {item.icon}
                </div>
                <h3 className={`font-heading text-[1.2rem] font-semibold tracking-[-0.05em] md:text-[2rem] ${variant.title}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 max-w-md text-[0.78rem] leading-5 md:mt-5 md:text-[0.95rem] md:leading-6 ${variant.desc}`}>{item.desc}</p>
              </article>
            )})}
          </div>
        </div>
      </section>

      <section className="px-2 py-4 md:px-4 md:py-12">
        <div className="container mx-auto">
          <div className="section-shell-dark px-3 py-4 md:px-10 md:py-10">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="editorial-card surface-sunset p-2 md:p-3">
                <div className="media-frame min-h-[220px] overflow-hidden rounded-[1rem] border border-white/25 md:min-h-[320px] md:rounded-[1.45rem]">
                  <img
                    src={heroSailingCard}
                    alt="Żaglówka Deskorelax na jeziorze"
                    className="h-full min-h-[220px] w-full object-cover md:min-h-[320px]"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:gap-4">
                {entryPoints.map((item) => {
                  return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="editorial-card surface-seafoam group flex items-start justify-between gap-2.5 p-3.5 md:gap-4 md:p-6"
                  >
                    <div>
                      <h3 className="font-heading text-[1.12rem] font-semibold tracking-[-0.04em] text-foreground md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-[0.76rem] leading-4 !text-foreground md:mt-3 md:text-sm md:leading-7">
                        {item.description}
                      </p>
                    </div>
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/12 bg-white/70 text-foreground transition-transform duration-300 group-hover:translate-x-1 md:h-11 md:w-11">
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-2 py-4 md:px-4 md:py-12 md:pb-16">
        <div className="container mx-auto">
          <div className="editorial-card surface-wash p-4 md:p-10">
            <h2 className="max-w-4xl font-heading text-[1.45rem] font-semibold tracking-[-0.05em] text-foreground md:text-5xl">
              Gotowy na swoją pierwszą albo kolejną sesję?
            </h2>
            <p className="mt-2.5 max-w-3xl text-[0.8rem] leading-5 text-muted-foreground md:mt-4 md:text-base md:leading-7">
              Jeśli chcesz zarezerwować kurs, dopytać o terminy albo po prostu poczuć klimat zanim przyjedziesz,
              napisz do nas.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-8 md:gap-3">
              <Link to="/kontakt" className="cta-primary">
                Skontaktuj się z nami
              </Link>
              <Link to="/o-nas" className="cta-secondary">
                Poznaj nas lepiej
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
