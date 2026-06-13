import { homeFeatures } from "./homeContent";
import Reveal from "@/components/motion/Reveal";

const iconColors = ["text-sky-400", "text-ocean-dark", "text-yellow-500"];

const HomeFeaturesSection = () => {
  return (
    <section className="content-visibility-auto edge-band edge-band-dark pb-10 pt-3 md:pb-16 md:pt-4">
      <div className="container mx-auto px-3 md:px-8">
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {homeFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                as="article"
                key={item.title}
                className="min-h-[200px] border-t border-primary/15 pt-4 md:min-h-[260px] md:pt-7"
              >
                <div className={`icon-badge-ocean mb-4 h-12 w-12 ${iconColors[index]} md:mb-7 md:h-16 md:w-16`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-heading text-[1.2rem] font-semibold tracking-normal text-foreground md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-[0.78rem] leading-5 text-muted-foreground md:mt-5 md:text-[0.95rem] md:leading-6">
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
