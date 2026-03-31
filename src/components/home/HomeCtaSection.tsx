import { Link } from "react-router-dom";

const HomeCtaSection = () => {
  return (
    <section className="px-2 py-4 md:px-4 md:pb-16 md:py-12">
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
  );
};

export default HomeCtaSection;
