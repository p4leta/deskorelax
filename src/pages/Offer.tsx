import Layout from "@/components/Layout";
import { offers, type OfferItem } from "@/data/offers";
import { Download, MoveRight } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

const preloadedPreviewSources = new Set<string>();

const preloadOfferPreview = (offer: OfferItem) => {
  const firstPage = offer.pdfPages?.[0];

  if (!firstPage || preloadedPreviewSources.has(firstPage)) {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = firstPage;
  preloadedPreviewSources.add(firstPage);
};

const OfferPreviewModal = ({
  offer,
  onClose,
}: {
  offer: OfferItem;
  onClose: () => void;
}) =>
  createPortal(
    <div className="fixed inset-0 z-[100] bg-[rgba(8,18,28,0.78)]" onClick={onClose}>
      <div className="flex h-full items-start justify-center overflow-y-auto px-2 py-16 md:px-4 md:py-20">
        <div
          className="w-full max-w-[118rem] space-y-4"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-white">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/65">Podglad oferty</p>
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.06em] md:text-5xl">
                {offer.panelTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {offer.downloadPdfSrc ? (
                <a
                  href={offer.downloadPdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary"
                >
                  <Download size={16} />
                  Pobierz PDF
                </a>
              ) : null}

              <button type="button" onClick={onClose} className="cta-inverse">
                Zamknij
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {(offer.pdfPages ?? []).map((pageSrc, index) => (
              <img
                key={pageSrc}
                src={pageSrc}
                alt={`${offer.panelTitle} - strona ${index + 1}`}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                className="block h-auto w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );

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
            className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 md:gap-6 ${
              activeOffer ? "pointer-events-none opacity-20" : "opacity-100"
            }`}
          >
            {offers.map((offer) => {
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
                  onFocus={() => preloadOfferPreview(offer)}
                  onMouseEnter={() => preloadOfferPreview(offer)}
                  onTouchStart={() => preloadOfferPreview(offer)}
                  className={`${variant.card} block rounded-[1.2rem] p-4 text-left transition-transform duration-200 hover:-translate-y-1 md:rounded-[1.75rem] md:p-8`}
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
              );
            })}
          </div>
        </div>
      </section>

      {activeOffer ? <OfferPreviewModal offer={activeOffer} onClose={() => setActiveSlug(null)} /> : null}
    </Layout>
  );
};

export default Offer;
