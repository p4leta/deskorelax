import { Baby, Sailboat, Waves, Wind } from "lucide-react";

export type OfferItem = {
  slug: string;
  icon: JSX.Element;
  title: string;
  desc: string;
  details: string;
  contentMode?: "pdf-pages" | "rich";
  panelTitle: string;
  panelLead: string;
  pdfPages?: string[];
  downloadPdfSrc?: string;
};

export const offers: OfferItem[] = [
  {
    slug: "kurs-zeglarstwa",
    icon: <Sailboat size={28} />,
    title: "Kurs żeglarstwa",
    desc: "Poznaj podstawy żeglowania i naucz się pewnie prowadzić łódź w różnych warunkach.",
    details: "Kliknij, aby otworzyć ofertówkę.",
    contentMode: "pdf-pages",
    panelTitle: "Kurs żeglarstwa 2026",
    panelLead:
      "Pełna ofertówka kursu żeglarstwa pokazana bezpośrednio w panelu strony, w układzie spójnym z resztą serwisu.",
    pdfPages: ["/offer-pages/zeglarstwo-2026/page-1.png"],
    downloadPdfSrc: "/offer-pdfs/zeglarstwo-2026.pdf",
  },
  {
    slug: "kurs-windsurfingu",
    icon: <Wind size={28} />,
    title: "Kurs windsurfingu",
    desc: "Od pierwszych ślizgów po pewne pływanie na desce z żaglem.",
    details: "Kliknij, aby otworzyć ofertówkę.",
    contentMode: "pdf-pages",
    panelTitle: "Kurs windsurfingu 2026",
    panelLead:
      "Pełna ofertówka kursu windsurfingu pokazana bez przeglądarkowego viewer-a, jako integralna część strony.",
    pdfPages: ["/offer-pages/windsurfing-2026/page-1.png"],
    downloadPdfSrc: "/offer-pdfs/windsurfing-2026.pdf",
  },
  {
    slug: "obozy",
    icon: <Waves size={28} />,
    title: "Obozy",
    desc: "Wyjazdy i intensywne bloki treningowe połączone z relaksem i sportową atmosferą.",
    details: "Kliknij, aby otworzyć ofertówkę.",
    contentMode: "pdf-pages",
    panelTitle: "Deskorelax Camp 2026",
    panelLead:
      "Pełna ofertówka obozów w formie brandowanego podglądu stron, bez obcego paska narzędzi PDF.",
    pdfPages: ["/offer-pages/obozy-2026/page-1.png"],
    downloadPdfSrc: "/offer-pdfs/obozy-2026.pdf",
  },
  {
    slug: "obozy-dzieciece",
    icon: <Baby size={28} />,
    title: "Obozy kid",
    desc: "Bezpieczne zajęcia i aktywny wypoczynek dla najmłodszych uczestników.",
    details: "Kliknij, aby otworzyć ofertówkę.",
    contentMode: "pdf-pages",
    panelTitle: "Obozy kid",
    panelLead:
      "Pełna ofertówka obozów kid w spójnym, natywnym podglądzie wpisanym w wizualny język strony.",
    pdfPages: ["/offer-pages/obozy-kid-2026/page-1.png"],
    downloadPdfSrc: "/offer-pdfs/obozy-kid-2026.pdf",
  },
];
