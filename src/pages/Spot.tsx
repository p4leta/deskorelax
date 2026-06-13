import { Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import spotHeroMap from "@/assets/spot-hero-map.jpg";
import Reveal from "@/components/motion/Reveal";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";
const googleMapsEmbed = "https://www.google.com/maps?q=Deskorelax%20Kretowiny&output=embed";

const Spot = () => {
  return (
    <>
      <PageHero
        title="Idealne miejsce do nauki i zabawy na wodzie"
        description="Płytka woda, stabilny wiatr i przestrzeń, która pracuje zarówno dla pierwszych prób, jak i regularnego pływania."
        className="pb-0 pt-0 md:pb-0 md:pt-2 [&_.subpage-hero]:pb-2 md:[&_.subpage-hero]:pb-4"
        panelClassName="surface-seafoam"
        reverseOnDesktop
        contentClassName="max-w-[42rem] self-center justify-self-start pt-0 lg:max-w-none [&_.subpage-title]:text-[clamp(2rem,5.4vw,4rem)] [&_p]:max-w-xl"
        asideClassName="w-full max-w-[44rem] self-center lg:max-w-[48rem]"
        aside={
          <div className="aspect-square w-full overflow-hidden rounded-[1.15rem] md:rounded-[1.55rem]">
            <img
              src={spotHeroMap}
              alt="Mapa spotu Deskorelax"
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        }
      />

      <section className="edge-band edge-band-light pb-8 pt-0 md:pb-16 md:pt-1">
        <div className="container mx-auto grid gap-7 px-3 md:gap-10 md:px-8">
          <Reveal className="flex h-full flex-col border-t border-primary/15 pt-4 md:pt-6">
            <div className="flex h-full flex-col gap-3 md:gap-4">
              <div className="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/42">Google Maps</p>
                  <h2 className="mt-1.5 font-heading text-[1.12rem] font-semibold tracking-normal text-foreground md:mt-2 md:text-[1.75rem]">
                    Zobacz dokładnie, gdzie jesteśmy.
                  </h2>
                </div>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary h-10 px-4 text-sm"
                >
                  <Navigation size={18} />
                  Otwórz w Google Maps
                </a>
              </div>

              <div className="media-frame flex-1 overflow-hidden">
                <iframe
                  title="Mapa Google Deskorelax"
                  src={googleMapsEmbed}
                  className="h-[24rem] w-full bg-white md:h-[36rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="flex h-full flex-col border-t border-primary/15 pt-4 md:pt-6" delay={0.08}>
            <div className="flex h-full flex-col gap-3 md:gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/42">Windy</p>
                <h2 className="mt-1.5 font-heading text-[1.12rem] font-semibold tracking-normal text-foreground md:mt-2 md:text-[1.75rem]">
                  Warunki wiatrowe pod ręką.
                </h2>
              </div>

              <div className="media-frame flex-1 overflow-hidden">
                <iframe
                  width="650"
                  height="450"
                  src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0C&metricWind=kt&zoom=11&overlay=wind&product=ecmwf&level=surface&lat=53.872&lon=20.023&detailLat=53.908&detailLon=20.024&detail=true"
                  frameBorder="0"
                  className="h-[24rem] w-full md:h-[36rem]"
                  title="Windy - warunki wiatrowe"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Spot;
