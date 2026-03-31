import { startTransition, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import OfferCard from "@/components/offers/OfferCard";
import OfferPreviewModal from "@/components/offers/OfferPreviewModal";
import { offers, type OfferItem } from "@/data/offers";

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

  const openOffer = (offer: OfferItem) => {
    startTransition(() => {
      setActiveSlug(offer.slug);
    });
  };

  return (
    <Layout>
      <section className="px-2 pb-10 pt-3 md:px-4 md:pb-16 md:pt-12">
        <div className="container mx-auto">
          <div
            className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 md:gap-6 ${
              activeOffer ? "pointer-events-none opacity-20" : "opacity-100"
            }`}
          >
            {offers.map((offer) => (
              <OfferCard
                key={offer.slug}
                offer={offer}
                onOpen={openOffer}
                onPreload={preloadOfferPreview}
              />
            ))}
          </div>
        </div>
      </section>

      {activeOffer ? <OfferPreviewModal offer={activeOffer} onClose={() => setActiveSlug(null)} /> : null}
    </Layout>
  );
};

export default Offer;
