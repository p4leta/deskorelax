import PrefetchLink from "@/components/PrefetchLink";
import Reveal from "@/components/motion/Reveal";

const HomeCtaSection = () => {
  return (
    <section className="content-visibility-auto edge-band edge-band-light py-10 md:py-16">
      <Reveal className="container mx-auto px-3 md:px-8">
        <h2 className="max-w-4xl font-heading text-[1.45rem] font-semibold tracking-normal text-foreground md:text-5xl">
          Gotowy na swoją pierwszą albo kolejną sesję?
        </h2>
        <p className="mt-2.5 max-w-3xl text-[0.8rem] leading-5 text-muted-foreground md:mt-4 md:text-base md:leading-7">
          Jeśli chcesz zarezerwować kurs, dopytać o terminy albo po prostu poczuć klimat zanim przyjedziesz,
          napisz do nas.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-8 md:gap-3">
          <PrefetchLink to="/kontakt" className="cta-primary">
            Skontaktuj się z nami
          </PrefetchLink>
          <PrefetchLink to="/o-nas" className="cta-secondary">
            Poznaj nas lepiej
          </PrefetchLink>
        </div>
      </Reveal>
    </section>
  );
};

export default HomeCtaSection;
