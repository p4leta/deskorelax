import { ArrowRight, BadgeCheck, Compass, MessagesSquare, Sparkles, Wind, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHero from "@/components/PageHero";
import PrefetchLink from "@/components/PrefetchLink";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type WingfoilMediaSlot = {
  src: string;
  futureSrc: string;
  alt: string;
  eyebrow: string;
  title: string;
};

type InfoCard = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

const wingfoilMedia = {
  actionGif: {
    src: "",
    futureSrc: "/wingfoil/wingfoil-action.gif",
    alt: "Wingfoiler płynący nad wodą z trzymanym w rękach skrzydłem",
    eyebrow: "GIF",
    title: "Wingfoiler w akcji",
  },
  setupPhoto: {
    src: "",
    futureSrc: "/wingfoil/wingfoil-setup.jpg",
    alt: "Sprzęt do wingfoila przygotowany przy brzegu jeziora",
    eyebrow: "Sprzęt",
    title: "Skrzydło, deska i foil",
  },
  lessonPhoto: {
    src: "",
    futureSrc: "/wingfoil/wingfoil-lesson.jpg",
    alt: "Instruktor Deskorelax prowadzi lekcję wingfoila na płytkiej wodzie",
    eyebrow: "Nauka",
    title: "Pierwsze kroki z instruktorem",
  },
} satisfies Record<string, WingfoilMediaSlot>;

const sportParts: InfoCard[] = [
  {
    title: "Skrzydło w rękach",
    text: "Zamiast żagla na maszcie trzymasz lekkie skrzydło, które łapie wiatr i daje napęd.",
    Icon: Wind,
  },
  {
    title: "Deska pod stopami",
    text: "Na początku liczy się spokojna pozycja, równowaga i kontrola kierunku na wodzie.",
    Icon: Waves,
  },
  {
    title: "Foil pod wodą",
    text: "Przy odpowiedniej prędkości hydroskrzydło unosi deskę, dając uczucie płynięcia nad taflą.",
    Icon: Sparkles,
  },
];

const reasons: InfoCard[] = [
  {
    title: "Nowa zajawka na wiatr",
    text: "Wingfoil jest stosunkowo młodą dyscypliną, która szybko rośnie, bo łączy prostotę sprzętu z ogromną frajdą.",
    Icon: Compass,
  },
  {
    title: "Blisko windsurfingu",
    text: "Czucie wiatru, praca ciałem i czytanie akwenu są znajome, dlatego doświadczenie Deskorelax dobrze przekłada się na naukę wingfoila.",
    Icon: BadgeCheck,
  },
  {
    title: "Dla pierwszych prób",
    text: "Zaczynamy od kontroli skrzydła i stabilnej deski, a dopiero potem dokładamy prędkość, zwroty i lot na foilu.",
    Icon: MessagesSquare,
  },
];

const MediaSlot = ({ slot, className, eager = false }: { slot: WingfoilMediaSlot; className?: string; eager?: boolean }) => (
  <div
    className={cn(
      "media-frame group relative isolate min-h-[16rem] overflow-hidden bg-[linear-gradient(135deg,rgba(32,110,175,0.92),rgba(25,147,180,0.78)_46%,rgba(232,181,89,0.72))]",
      className,
    )}
    data-future-src={slot.futureSrc}
  >
    {slot.src ? (
      <img
        src={slot.src}
        alt={slot.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    ) : (
      <div role="img" aria-label={slot.alt} className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-8 h-40 w-40 rounded-full border border-white/35 bg-white/10 blur-[1px] transition-transform duration-500 group-hover:scale-105 md:h-56 md:w-56" />
        <div className="absolute left-7 top-8 h-24 w-40 rotate-[-12deg] rounded-[60%_40%_55%_45%] border border-white/45 bg-white/20 shadow-[0_20px_55px_rgba(5,26,42,0.18)] md:left-12 md:top-12 md:h-32 md:w-56" />
        <div className="absolute left-[34%] top-[43%] h-2 w-[38%] rotate-[-7deg] rounded-full bg-white/80 shadow-[0_10px_24px_rgba(7,38,54,0.18)]" />
        <div className="absolute left-[46%] top-[48%] h-12 w-12 rounded-full border border-white/50 bg-white/20 shadow-[0_16px_38px_rgba(7,38,54,0.16)]" />
        <div className="absolute bottom-12 left-[-10%] h-20 w-[125%] rotate-[-3deg] rounded-[100%] bg-white/20" />
        <div className="absolute bottom-5 left-[-8%] h-16 w-[118%] rotate-[2deg] rounded-[100%] bg-primary/20" />
      </div>
    )}

    <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white md:p-5">
      <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/90">
        {slot.eyebrow}
      </span>
      <p className="mt-3 max-w-xs font-heading text-xl font-semibold tracking-normal md:text-2xl">{slot.title}</p>
    </div>
  </div>
);

const Wingfoil = () => {
  return (
    <>
      <PageHero
        title="Wingfoil w Deskorelax"
        description="Uczymy nowego sposobu pływania z wiatrem: skrzydło w rękach, deska pod stopami i foil, który przy odpowiedniej prędkości unosi ją nad wodę. Jeśli znasz windsurfing, poczujesz znajomy wiatr; jeśli zaczynasz od zera, przeprowadzimy Cię przez podstawy krok po kroku."
        className="pb-6 md:pb-10"
        panelClassName="surface-seafoam"
        contentClassName="max-w-[42rem] justify-self-start lg:max-w-none"
        asideClassName="w-full max-w-[52rem] lg:max-w-none"
        aside={<MediaSlot slot={wingfoilMedia.actionGif} className="aspect-[4/3] w-full" eager />}
      />

      <section className="edge-band edge-band-light pb-8 pt-0 md:pb-16">
        <div className="container mx-auto grid gap-5 px-3 md:gap-8 md:px-8">
          <Reveal className="section-shell surface-seafoam p-5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <div className="space-y-5">
                <span className="eyebrow">Czym jest wingfoil?</span>
                <div className="space-y-4">
                  <h2 className="section-title">Lekki sprzęt, wiatr w dłoni i uczucie lotu nad wodą.</h2>
                  <p className="section-lead">
                    Wingfoil to młody sport wodny, który łączy elementy windsurfingu, kitesurfingu i foila. Nie ma
                    masztu ani linek: trzymasz skrzydło bezpośrednio w rękach, sterujesz nim względem wiatru i
                    napędzasz deskę.
                  </p>
                  <p className="prose-muted">
                    Największa magia zaczyna się wtedy, gdy foil zaczyna pracować pod wodą. Deska odrywa się od tafli,
                    opór maleje, a płynięcie staje się ciche, szybkie i bardzo lekkie.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                {sportParts.map(({ title, text, Icon }) => (
                  <div key={title} className="editorial-card p-4 md:p-5">
                    <div className="relative flex h-full flex-col gap-4">
                      <span className="icon-badge-seafoam h-11 w-11">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-heading text-xl font-semibold tracking-normal text-foreground">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal className="grid gap-5" delay={0.06}>
              <MediaSlot slot={wingfoilMedia.setupPhoto} className="aspect-[4/3] w-full" />
              <MediaSlot slot={wingfoilMedia.lessonPhoto} className="aspect-[4/3] w-full" />
            </Reveal>

            <Reveal className="section-shell surface-sunset p-5 md:p-8" delay={0.1}>
              <div className="space-y-6">
                <span className="eyebrow">Nauka z Deskorelax</span>
                <div className="space-y-4">
                  <h2 className="section-title">Pokazujemy wingfoil spokojnie, technicznie i bez presji.</h2>
                  <p className="section-lead">
                    Deskorelax to szkoła windsurfingowa z doświadczeniem w pracy z wiatrem, wodą i różnymi poziomami
                    zaawansowania. Tego samego podejścia używamy przy wingfoilu: najpierw bezpieczeństwo i zrozumienie
                    sprzętu, potem coraz więcej samodzielności.
                  </p>
                </div>

                <div className="grid gap-3">
                  {reasons.map(({ title, text, Icon }) => (
                    <div key={title} className="flex gap-4 border-t border-primary/15 pt-4">
                      <span className="icon-badge-sunset h-10 w-10 shrink-0">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold tracking-normal text-foreground">{title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="section-shell surface-ocean p-5 md:p-8" delay={0.08}>
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-3">
                <span className="eyebrow eyebrow-dark">Lekcje wingfoil</span>
                <h2 className="font-heading text-3xl font-semibold tracking-normal text-white md:text-5xl">
                  Chcesz spróbować? Napisz do nas przed przyjazdem nad jezioro.
                </h2>
                <p className="text-base leading-7 text-white/76">
                  Dobierzemy termin, warunki i plan nauki do Twojego poziomu. Możesz zacząć od absolutnych podstaw albo
                  potraktować wingfoil jako kolejny krok po windsurfingu.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <PrefetchLink to="/kontakt" className="cta-inverse">
                  Zapytaj o lekcje wingfoil
                  <ArrowRight size={18} />
                </PrefetchLink>
                <PrefetchLink to="/spot" className="cta-secondary">
                  Zobacz spot
                </PrefetchLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Wingfoil;
