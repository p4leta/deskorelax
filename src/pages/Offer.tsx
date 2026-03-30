import Layout from "@/components/Layout";
import { offers } from "@/data/offers";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="subpage-title-kretowiny text-4xl md:text-5xl font-extrabold text-center mb-6">
            Oferta
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Kliknij w kafel, a ofertówka otworzy się w natywnym, spójnym podglądzie.
          </p>

          <div className="relative">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-out ${
                activeOffer
                  ? "opacity-20 scale-[0.985] pointer-events-none blur-[8px]"
                  : "opacity-100 scale-100"
              }`}
            >
              {offers.map((offer) => (
                <button
                  key={offer.slug}
                  type="button"
                  onClick={() => setActiveSlug(offer.slug)}
                  className="bg-card rounded-xl border border-border p-8 transition-all duration-300 ease-out block text-left hover:shadow-md hover:scale-[1.01]"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 text-secondary mb-4">
                    {offer.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-3">{offer.desc}</p>
                  <p className="text-sm text-muted-foreground/70 italic">{offer.details}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeOffer && (
        <div
          className="fixed inset-0 z-[60] bg-[rgba(7,16,16,0.34)] backdrop-blur-md"
          onClick={() => setActiveSlug(null)}
        >
          <div className="flex h-full items-start justify-center overflow-y-auto px-4 pb-10 pt-24 md:px-8">
            <div className="w-full max-w-[92rem]">
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setActiveSlug(null)}
                  className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                  Zamknij
                </button>
              </div>

              <div
                className="w-full rounded-[2rem] border border-[#d8e9e5] bg-[linear-gradient(180deg,rgba(244,251,249,0.96)_0%,rgba(231,246,242,0.94)_100%)] p-6 md:p-10 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out animate-in fade-in zoom-in-95 slide-in-from-bottom-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
                  <div className="max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-6">
                      {activeOffer.icon}
                    </div>

                    <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-4 text-card-foreground">
                      {activeOffer.panelTitle}
                    </h2>
                  </div>

                  {activeOffer.downloadPdfSrc && (
                    <a
                      href={activeOffer.downloadPdfSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#b7ddd5] bg-white/80 px-5 py-3 text-sm font-semibold text-[#184c4a] shadow-sm transition-colors hover:bg-white"
                    >
                      <Download size={16} />
                      Pobierz PDF
                    </a>
                  )}
                </div>

                <div className="rounded-[1.75rem] border border-[#cfe3de] bg-[rgba(255,255,255,0.42)] p-4 md:p-6">
                  <div className="mx-auto flex max-w-6xl flex-col gap-6">
                    {(activeOffer.pdfPages ?? []).map((pageSrc, index) => (
                      <figure
                        key={pageSrc}
                        className="overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_40px_rgba(20,60,57,0.14)] ring-1 ring-black/5"
                      >
                        <img
                          src={pageSrc}
                          alt={`${activeOffer.panelTitle} - strona ${index + 1}`}
                          className="block w-full h-auto"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Offer;
