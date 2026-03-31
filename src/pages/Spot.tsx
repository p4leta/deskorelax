import { Navigation } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import spotHeroMap from "@/assets/spot-hero-map.jpg";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";
const googleMapsEmbed = "https://www.google.com/maps?q=Deskorelax%20Kretowiny&output=embed";

const Spot = () => {
  return (
    <Layout>
      <PageHero
        title="Idealne miejsce do nauki i zabawy na wodzie"
        description="Płytka woda, stabilny wiatr i przestrzeń, która pracuje zarówno dla pierwszych prób, jak i regularnego pływania."
        panelClassName="surface-seafoam"
        reverseOnDesktop
        contentClassName="self-start pt-2 md:pt-0 lg:pt-2"
        asideClassName="w-full lg:w-[32rem] xl:w-[36rem]"
        aside={
          <div className="editorial-card surface-ocean p-2 md:p-3">
            <div className="media-frame min-h-[360px] w-full overflow-hidden rounded-[1.55rem]">
              <img
                src={spotHeroMap}
                alt="Mapa spotu Deskorelax"
                loading="eager"
                decoding="async"
                className="h-full min-h-[360px] w-full object-cover"
              />
            </div>
          </div>
        }
      />

      <section className="px-3 py-3 md:px-4 md:pb-16">
        <div className="container mx-auto grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.96fr)]">
          <div className="section-shell surface-sunset flex h-full flex-col p-2 md:p-4">
            <div className="flex h-full flex-col gap-3 p-2 md:gap-4 md:p-3">
              <div className="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/42">Google Maps</p>
                  <h2 className="mt-1.5 font-heading text-[1.12rem] font-semibold tracking-[-0.05em] text-foreground md:mt-2 md:text-[1.75rem]">
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
          </div>

          <div className="section-shell-dark surface-ocean flex h-full flex-col p-2 md:p-4">
            <div className="flex h-full flex-col gap-3 p-2 md:gap-4 md:p-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Windy</p>
                <h2 className="mt-1.5 font-heading text-[1.12rem] font-semibold tracking-[-0.05em] text-white md:mt-2 md:text-[1.75rem]">
                  Warunki wiatrowe pod ręką.
                </h2>
              </div>

              <div className="flex-1 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Spot;
