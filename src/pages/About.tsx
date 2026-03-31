import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Award, Heart, Users } from "lucide-react";
import aboutHeroWindsurf from "@/assets/about-hero-windsurf.jpg";

const values = [
  {
    icon: <Heart size={28} />,
    title: "Pasja",
    desc: "Windsurfing to nasza miłość. Dzielimy się nią z radością.",
  },
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
];

const About = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="O nas"
        title="Nasza historia"
        description={`Jesteśmy trójką przyjaciół, których połączyła jedna rzecz - ogromna zajawka do sportów wodnych. Deskorelax powstał nad naszym jeziorem ponad 15 lat temu, zupełnie naturalnie - jako projekt dla znajomych, wspólne pływanie, wakacje spędzane nad wodą i klimat, którego nie da się stworzyć na siłę. Chodziło po prostu o to, żeby spędzać najlepsze lato w życiu: dużo wody, dużo wiatru, dobra ekipa i totalny chill.

Z czasem z tej pasji powstała szkółka, ale jedno się nie zmieniło - wciąż robimy to z dokładnie takim samym podejściem. Bez nadęcia, za to z ogromną energią i miłością do wody. Chcemy pokazać ludziom, jak wciągające mogą być sporty wodne i jak wiele radości daje pływanie, wiatr w żaglu i letnie dni spędzone nad jeziorem.

Do dziś Deskorelax to przede wszystkim ludzie, klimat i wspólna zajawka.`}
        className="pb-6 md:pb-8"
        panelClassName="surface-seafoam"
        descriptionClassName="max-w-3xl whitespace-pre-line"
        contentClassName="lg:max-w-[44rem] lg:self-start"
        asideClassName="w-full lg:w-[32rem] xl:w-[36rem]"
        aside={
          <div className="editorial-card surface-sunset p-2 md:p-3">
            <div className="media-frame min-h-[360px] w-full overflow-hidden rounded-[1.55rem]">
              <img
                src={aboutHeroWindsurf}
                alt="Windsurfing w Deskorelax"
                className="h-full min-h-[360px] w-full object-cover"
              />
            </div>
          </div>
        }
      />

      <section className="px-2 py-2.5 md:px-4 md:pb-16">
        <div className="container mx-auto">
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {values.map((item) => {
              return (
              <article key={item.title} className="editorial-card-dark surface-ocean p-4 text-center md:p-10">
                <div className="icon-badge-ocean mx-auto mb-4 h-14 w-14 md:mb-6 md:h-20 md:w-20">
                  {item.icon}
                </div>
                <h3 className="font-heading text-[1.8rem] font-semibold tracking-[-0.05em] text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-6 text-white/74 md:mt-6 md:text-lg md:leading-8">
                  {item.desc}
                </p>
              </article>
            )})}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
