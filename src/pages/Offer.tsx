import Layout from "@/components/Layout";
import { offers } from "@/data/offers";
import { Download, MoveRight } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

const offerCardVariants: Record<
  string,
  {
    card: string;
    icon: string;
    eyebrow: string;
    title: string;
    desc: string;
    details: string;
    arrow: string;
  }
> = {
  "kurs-zeglarstwa": {
    card: "editorial-card surface-seafoam",
    icon: "icon-badge-seafoam",
    eyebrow: "text-foreground/42",
    title: "text-foreground",
    desc: "text-muted-foreground",
    details: "text-muted-foreground/76",
    arrow: "border border-primary/12 bg-white/75 text-foreground",
  },
  "kurs-windsurfingu": {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    eyebrow: "text-white/45",
    title: "text-white",
    desc: "text-white/72",
    details: "text-white/58",
    arrow: "border border-white/15 bg-white/10 text-white",
  },
  obozy: {
    card: "editorial-card-dark surface-ocean ring-1 ring-white/10",
    icon: "icon-badge-ocean",
    eyebrow: "text-white/45",
    title: "text-white",
    desc: "text-white/72",
    details: "text-white/58",
    arrow: "border border-white/15 bg-white/10 text-white",
  },
  "obozy-dzieciece": {
    card: "editorial-card",
    icon: "icon-badge-sunset",
    eyebrow: "text-foreground/42",
    title: "text-foreground",
    desc: "text-muted-foreground",
    details: "text-muted-foreground/76",
    arrow: "border border-foreground/10 bg-white/80 text-foreground",
  },
};

const Offer = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeOffer = offers.find((offer) => offer.slug === activeSlug) ?? null;

  useEffect(() => {
    if (!activeOffer) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeOffer]);

  return (
    <Layout>
      <section className="px-2 pb-10 pt-3 md:px-4 md:pb-16 md:pt-12">
        <div className="container mx-auto">
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 transition-all duration-500 ${
              activeOffer ? "pointer-events-none opacity-20" : "opacity-100"
            }`}
          >
            {offers.map((offer, index) => {
              const variant = offerCardVariants[offer.slug];

              return (
              <button
                key={offer.slug}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveSlug(offer.slug);
                  });
                }}
                className={`${variant.card} block rounded-[1.2rem] p-4 text-left transition-all duration-300 hover:-translate-y-1 md:rounded-[1.75rem] md:p-8`}
              >
                <div className="flex h-full min-h-[220px] flex-col justify-between gap-4 md:min-h-[320px] md:gap-8">
                  <div>
                    <div className={`mb-3.5 h-12 w-12 md:mb-5 md:h-16 md:w-16 ${variant.icon}`}>
                      {offer.icon}
                    </div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${variant.eyebrow}`}>
                      Oferta Deskorelax
                    </p>
                    <h3 className={`mt-2 font-heading text-[1.25rem] font-semibold tracking-[-0.05em] md:mt-4 md:text-3xl ${variant.title}`}>
                      {offer.title}
                    </h3>
                    <p className={`mt-2 max-w-2xl text-[0.76rem] leading-4 md:mt-4 md:text-base md:leading-7 ${variant.desc}`}>
                      {offer.desc}
                    </p>
                    <p className={`mt-1.5 text-[0.72rem] italic leading-4 md:mt-4 md:text-sm md:leading-6 ${variant.details}`}>
                      {offer.details}
                    </p>
                  </div>

                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${variant.arrow}`}>
                    <MoveRight size={18} />
                  </span>
                </div>
              </button>
            )})}
          </div>
        </div>
      </section>

      {activeOffer ? (
        <div className="fixed inset-0 z-[100] bg-[rgba(8,18,28,0.78)]" onClick={() => setActiveSlug(null)}>
          <div className="flex h-full items-start justify-center overflow-y-auto px-4 py-24 md:px-8">
            <div className="w-full max-w-[96rem]">
              <div className="mb-4 flex justify-end">
                <button type="button" onClick={() => setActiveSlug(null)} className="cta-inverse">
                  Zamknij
                </button>
              </div>

              <div
                className="section-shell surface-wash overflow-hidden border-white/20 p-6 md:p-8 lg:p-10"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {activeOffer.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/42">Podgląd oferty</p>
                      <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.06em] text-foreground md:text-6xl">
                        {activeOffer.panelTitle}
                      </h2>
                    </div>

                    {activeOffer.downloadPdfSrc ? (
                      <a
                        href={activeOffer.downloadPdfSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-primary"
                      >
                        <Download size={16} />
                        Pobierz PDF
                      </a>
                    ) : null}
                  </div>

                  <div className="editorial-card p-3 md:p-4">
                    <div className="mx-auto flex max-w-[88rem] flex-col gap-6">
                      {(activeOffer.pdfPages ?? []).map((pageSrc, index) => (
                        <figure
                          key={pageSrc}
                          className="overflow-hidden rounded-[1.35rem] border border-white/70 bg-white shadow-[0_18px_36px_rgba(15,32,46,0.1)]"
                        >
                          <img
                            src={pageSrc}
                            alt={`${activeOffer.panelTitle} - strona ${index + 1}`}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                            loading={index === 0 ? "eager" : "lazy"}
                            className="block h-auto w-full"
                          />
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Offer;
