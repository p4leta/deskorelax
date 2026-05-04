import { Download, X } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { OfferItem } from "@/data/offers";

type OfferPreviewModalProps = {
  offer: OfferItem;
  onClose: () => void;
};

const OfferPreviewModal = ({ offer, onClose }: OfferPreviewModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] bg-[rgba(8,18,28,0.78)]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-full items-start justify-center overflow-y-auto px-2 py-12 md:px-4 md:py-16">
        <motion.div
          className="w-full max-w-[118rem] space-y-4"
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto w-full max-w-full lg:max-w-[74rem] xl:max-w-[82rem]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2 text-white">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/65">Podglad oferty</p>
                <h2 className="font-heading text-2xl font-semibold tracking-normal md:text-5xl">
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

                <button type="button" onClick={onClose} className="cta-inverse" autoFocus>
                  <X size={16} />
                  Zamknij
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-full flex-col gap-4 lg:max-w-[74rem] xl:max-w-[82rem]">
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
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  );
};

export default OfferPreviewModal;
