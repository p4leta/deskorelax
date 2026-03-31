import { Sun, Waves, Wind, type LucideIcon } from "lucide-react";

type HomeFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type HomeEntryPoint = {
  title: string;
  description: string;
  href: string;
};

export const homeFeatures: HomeFeature[] = [
  {
    icon: Wind,
    title: "Doświadczeni instruktorzy",
    desc: "Uczymy swobodnie i konkretnie, z naciskiem na progres, bezpieczeństwo i dobrą energię na wodzie.",
  },
  {
    icon: Waves,
    title: "Idealny spot",
    desc: "Płytka woda i warunki, które dobrze pracują zarówno dla pierwszych prób, jak i dalszego rozwoju.",
  },
  {
    icon: Sun,
    title: "Luźna atmosfera",
    desc: "Deskorelax to szkoła, ale też klimat wakacyjnego miejsca, do którego chce się wracać.",
  },
];

export const homeEntryPoints: HomeEntryPoint[] = [
  {
    title: "Kursy i oferta",
    description: "Windsurfing, żeglarstwo, obozy i warianty dopasowane do wieku oraz poziomu zaawansowania.",
    href: "/oferta",
  },
  {
    title: "Poznaj nasz spot",
    description: "Sprawdź, gdzie pływamy, jak wygląda lokalizacja i jakie warunki czekają na miejscu.",
    href: "/spot",
  },
  {
    title: "Zobacz klimat na żywo",
    description: "Galeria i Instagram pokazują to, co dla nas najważniejsze: ludzi, ruch, lato i wodę.",
    href: "/galeria",
  },
];
