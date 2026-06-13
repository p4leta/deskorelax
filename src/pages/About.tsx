import PageHero from "@/components/PageHero";
import aboutHeroWindsurf from "@/assets/about-hero-windsurf.jpg";

const About = () => {
  return (
    <>
      <PageHero
        title="Nasza historia"
        description={`Jesteśmy trójką przyjaciół, których połączyła jedna rzecz - ogromna zajawka do sportów wodnych. Deskorelax powstał nad naszym jeziorem ponad 15 lat temu, zupełnie naturalnie - jako projekt dla znajomych, wspólne pływanie, wakacje spędzane nad wodą i klimat, którego nie da się stworzyć na siłę. Chodziło po prostu o to, żeby spędzać najlepsze lato w życiu: dużo wody, dużo wiatru, dobra ekipa i totalny chill.

Z czasem z tej pasji powstała szkółka, ale jedno się nie zmieniło - wciąż robimy to z dokładnie takim samym podejściem. Bez nadęcia, za to z ogromną energią i miłością do wody. Chcemy pokazać ludziom, jak wciągające mogą być sporty wodne i jak wiele radości daje pływanie, wiatr w żaglu i letnie dni spędzone nad jeziorem.

Do dziś Deskorelax to przede wszystkim ludzie, klimat i wspólna zajawka.`}
        className="pb-6 md:pb-8"
        panelClassName="surface-seafoam"
        descriptionClassName="max-w-3xl whitespace-pre-line"
        contentClassName="max-w-[42rem] justify-self-start lg:max-w-none lg:self-start"
        asideClassName="w-full max-w-[56rem] lg:max-w-none"
        aside={
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.55rem]">
            <img
              src={aboutHeroWindsurf}
              alt="Windsurfing w Deskorelax"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        }
      />
    </>
  );
};

export default About;
