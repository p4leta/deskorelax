import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import type { OfferItem } from "@/data/offers";

const offerCardVariants: Record<
  string,
  {
    accent: string;
  }
> = {
  "kurs-zeglarstwa": {
    accent: "text-[#1f75ad]",
  },
  "kurs-windsurfingu": {
    accent: "text-[#e36f2c]",
  },
  obozy: {
    accent: "text-[#174f7f]",
  },
  "obozy-dzieciece": {
    accent: "text-[#e7b93f]",
  },
};

type OfferCardProps = {
  offer: OfferItem;
  onOpen: (offer: OfferItem) => void;
  onPreload: (offer: OfferItem) => void;
};

const OfferCard = ({ offer, onOpen, onPreload }: OfferCardProps) => {
  const variant = offerCardVariants[offer.slug];

  return (
    <motion.div
      className="h-full transform-gpu"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(offer)}
        onFocus={() => onPreload(offer)}
        onMouseEnter={() => onPreload(offer)}
        onTouchStart={() => onPreload(offer)}
        className="block h-full w-full rounded-[1rem] border border-[rgba(32,110,175,0.16)] bg-[rgba(255,255,255,0.72)] p-4 text-left shadow-[0_20px_60px_rgba(19,32,51,0.1)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[rgba(227,111,44,0.28)] hover:shadow-[0_22px_70px_rgba(227,111,44,0.14)] active:scale-[0.985] md:rounded-[1.25rem] md:p-8"
      >
        <div className="flex h-full min-h-[220px] flex-col justify-between gap-4 md:min-h-[320px] md:gap-8">
          <div>
            <div className={`icon-badge-seafoam mb-3.5 h-12 w-12 bg-white/65 md:mb-5 md:h-16 md:w-16 ${variant.accent}`}>
              {offer.icon}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#132033]/45">
              Kursy i Obozy
            </p>
            <h3 className="mt-2 font-heading text-[1.25rem] font-semibold tracking-normal text-[#132033] md:mt-4 md:text-3xl">
              {offer.title}
            </h3>
            <p
              className="mt-2 max-w-2xl text-[0.76rem] leading-4 text-[#536274] md:mt-4 md:text-base md:leading-7"
            >
              {offer.desc}
            </p>
            <p
              className="mt-1.5 text-[0.72rem] italic leading-4 text-[#536274]/80 md:mt-4 md:text-sm md:leading-6"
            >
              {offer.details}
            </p>
          </div>

          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(32,110,175,0.16)] bg-white/65 shadow-sm ${variant.accent}`}>
            <MoveRight size={18} />
          </span>
        </div>
      </button>
    </motion.div>
  );
};

export default OfferCard;
