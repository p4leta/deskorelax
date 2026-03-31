import { ArrowRight } from "lucide-react";
import PrefetchLink from "@/components/PrefetchLink";
import heroSailingCard from "@/assets/hero-sailing-card.jpg";
import { homeEntryPoints } from "./homeContent";

const HomeEntryPointsSection = () => {
  return (
    <section className="px-2 py-4 md:px-4 md:py-12">
      <div className="container mx-auto">
        <div className="section-shell-dark px-3 py-4 md:px-10 md:py-10">
          <div className="grid gap-4 md:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="editorial-card surface-sunset p-2 md:p-3">
              <div className="media-frame min-h-[220px] overflow-hidden rounded-[1rem] border border-white/25 md:min-h-[320px] md:rounded-[1.45rem]">
                <img
                  src={heroSailingCard}
                  alt="Zaglowka Deskorelax na jeziorze"
                  loading="lazy"
                  decoding="async"
                  className="h-full min-h-[220px] w-full object-cover md:min-h-[320px]"
                />
              </div>
            </div>

            <div className="grid gap-3 md:gap-4">
              {homeEntryPoints.map((item) => {
                return (
                  <PrefetchLink
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
                  </PrefetchLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeEntryPointsSection;
