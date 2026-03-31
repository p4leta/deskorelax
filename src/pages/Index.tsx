import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Sun, Waves, Wind } from "lucide-react";
import Layout from "@/components/Layout";
import heroDeskorelaxSunset from "@/assets/hero-deskorelax-sunset.jpg";
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
    card: "editorial-card surface-seafoam",
    icon: "icon-badge-seafoam text-primary",
    title: "text-foreground",
    desc: "text-muted-foreground",
  },
  {
    card: "editorial-card surface-sunset",
    icon: "icon-badge-sunset",
    title: "text-foreground",
    desc: "text-muted-foreground",
  },
  {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    title: "text-white",
    desc: "text-white/74",
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

const entryPointVariants = [
  {
    card: "editorial-card-dark surface-ocean",
    eyebrow: "text-white/45",
    title: "text-white",
    desc: "text-white/72",
    arrow: "border border-white/15 bg-white/10 text-white",
  },
  {
    card: "editorial-card surface-seafoam",
    eyebrow: "",
    eyebrowStyle: { color: "rgba(19, 34, 53, 0.64)" },
    title: "!text-foreground",
    desc: "",
    descStyle: { color: "rgba(19, 34, 53, 0.82)" },
    arrow: "border border-primary/12 bg-white/70 text-foreground",
  },
  {
    card: "editorial-card surface-sunset",
    eyebrow: "",
    eyebrowStyle: { color: "rgba(19, 34, 53, 0.64)" },
    title: "!text-foreground",
    desc: "",
    descStyle: { color: "rgba(19, 34, 53, 0.82)" },
    arrow: "border border-accent/18 bg-white/60 text-foreground",
  },
];

const Index = () => {
  return (
    <Layout>
      <section className="section-frame overflow-hidden px-4 pb-14 pt-28 md:pt-36 md:pb-20">
        <div className="container mx-auto">
          <div className="media-frame min-h-[520px] md:min-h-[640px]">
            <img
              src={heroDeskorelaxSunset}
              alt="Deskorelax przy jeziorze o zachodzie słońca"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,186,142,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(86,206,209,0.24),transparent_26%),linear-gradient(180deg,rgba(15,18,28,0.22)_0%,rgba(15,18,28,0.42)_100%)]" />
            <div className="ambient-blob right-12 top-10 h-36 w-36 bg-sunset/25" />
            <div className="ambient-blob bottom-10 left-10 h-44 w-44 bg-ocean-light/25" />

            <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[640px] md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="space-y-8">
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

      <section className="px-4 py-6 md:py-10">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, index) => {
              const variant = featureVariants[index];

              return (
              <article key={item.title} className={`${variant.card} p-6`}>
                <div className={`mb-5 h-14 w-14 ${variant.icon}`}>
                  {item.icon}
                </div>
                <h3 className={`font-heading text-2xl font-semibold tracking-[-0.04em] ${variant.title}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${variant.desc}`}>{item.desc}</p>
              </article>
            )})}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12">
        <div className="container mx-auto">
          <div className="section-shell-dark px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="editorial-card surface-sunset p-2 md:p-3">
                <div className="media-frame min-h-[320px] overflow-hidden rounded-[1.45rem] border border-white/25">
                  <img
                    src={heroSailingCard}
                    alt="Żaglówka Deskorelax na jeziorze"
                    className="h-full min-h-[320px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {entryPoints.map((item, index) => {
                  const variant = entryPointVariants[index];

                  return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`${variant.card} group flex items-start justify-between gap-4 p-6`}
                  >
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.24em] ${variant.eyebrow}`}
                        style={variant.eyebrowStyle}
                      >
                        Explore
                      </p>
                      <h3 className={`mt-3 font-heading text-2xl font-semibold tracking-[-0.04em] ${variant.title}`}>
                        {item.title}
                      </h3>
                      <p
                        className={`mt-3 max-w-lg text-sm leading-7 ${variant.desc}`}
                        style={variant.descStyle}
                      >
                        {item.description}
                      </p>
                    </div>
                    <span className={`mt-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${variant.arrow}`}>
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12 md:pb-16">
        <div className="container mx-auto">
          <div className="editorial-card surface-wash p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/42">Ready when you are</p>
            <h2 className="mt-5 max-w-4xl font-heading text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">
              Gotowy na swoją pierwszą albo kolejną sesję?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              Jeśli chcesz zarezerwować kurs, dopytać o terminy albo po prostu poczuć klimat zanim przyjedziesz,
              napisz do nas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
