import { ArrowRight } from "lucide-react";
import PrefetchLink from "@/components/PrefetchLink";
import heroSailingCard from "@/assets/hero-sailing-card.jpg";
import { homeEntryPoints } from "./homeContent";
import Reveal from "@/components/motion/Reveal";

const HomeEntryPointsSection = () => {
  return (
    <section className="content-visibility-auto edge-band edge-band-dark py-8 md:py-16">
      <Reveal className="container mx-auto px-3 md:px-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative">
            <div className="min-h-[220px] overflow-hidden rounded-[1rem] md:min-h-[320px] md:rounded-[1.45rem]">
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
                  className="premium-link-card group flex items-start justify-between gap-2.5 border-t border-primary/15 py-4 md:gap-4 md:py-7"
                >
                  <div>
                    <h3 className="font-heading text-[1.12rem] font-semibold tracking-normal text-foreground md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-[0.76rem] leading-4 text-muted-foreground md:mt-3 md:text-sm md:leading-7">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/12 bg-white/70 text-foreground transition-transform duration-300 group-hover:translate-x-1 md:h-11 md:w-11">
                    <ArrowRight size={18} />
                  </span>
                </PrefetchLink>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default HomeEntryPointsSection;
