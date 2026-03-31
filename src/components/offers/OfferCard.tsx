import { MoveRight } from "lucide-react";
import type { OfferItem } from "@/data/offers";

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

type OfferCardProps = {
  offer: OfferItem;
  onOpen: (offer: OfferItem) => void;
  onPreload: (offer: OfferItem) => void;
};

const OfferCard = ({ offer, onOpen, onPreload }: OfferCardProps) => {
  const variant = offerCardVariants[offer.slug];

  return (
    <button
      type="button"
      onClick={() => onOpen(offer)}
      onFocus={() => onPreload(offer)}
      onMouseEnter={() => onPreload(offer)}
      onTouchStart={() => onPreload(offer)}
      className={`${variant.card} block rounded-[1.2rem] p-4 text-left transition-transform duration-200 hover:-translate-y-1 md:rounded-[1.75rem] md:p-8`}
    >
      <div className="flex h-full min-h-[220px] flex-col justify-between gap-4 md:min-h-[320px] md:gap-8">
        <div>
          <div className={`mb-3.5 h-12 w-12 md:mb-5 md:h-16 md:w-16 ${variant.icon}`}>{offer.icon}</div>
          <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${variant.eyebrow}`}>
            Oferta Deskorelax
          </p>
          <h3
            className={`mt-2 font-heading text-[1.25rem] font-semibold tracking-[-0.05em] md:mt-4 md:text-3xl ${variant.title}`}
          >
            {offer.title}
          </h3>
          <p
            className={`mt-2 max-w-2xl text-[0.76rem] leading-4 md:mt-4 md:text-base md:leading-7 ${variant.desc}`}
          >
            {offer.desc}
          </p>
          <p
            className={`mt-1.5 text-[0.72rem] italic leading-4 md:mt-4 md:text-sm md:leading-6 ${variant.details}`}
          >
            {offer.details}
          </p>
        </div>

        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${variant.arrow}`}>
          <MoveRight size={18} />
        </span>
      </div>
    </button>
  );
};

export default OfferCard;
