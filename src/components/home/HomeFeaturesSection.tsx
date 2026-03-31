import { homeFeatures } from "./homeContent";

const HomeFeaturesSection = () => {
  return (
    <section className="px-2 py-3 md:px-4 md:py-10">
      <div className="container mx-auto">
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {homeFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="editorial-card-dark surface-ocean min-h-[200px] p-4 md:min-h-[260px] md:p-7"
              >
                <div className="icon-badge-ocean mb-4 h-12 w-12 md:mb-7 md:h-16 md:w-16">
                  <Icon size={28} />
                </div>
                <h3 className="font-heading text-[1.2rem] font-semibold tracking-[-0.05em] text-white md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-[0.78rem] leading-5 text-white/78 md:mt-5 md:text-[0.95rem] md:leading-6">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
