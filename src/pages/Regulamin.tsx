import { Download, ExternalLink, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

const regulaminPdfSrc = "/regulamin.pdf";

const Regulamin = () => {
  return (
    <>
      <PageHero
        title="Regulamin"
        description="Aktualny regulamin Deskorelax jest dostępny poniżej jako dokument PDF."
        panelClassName="surface-seafoam"
        asideClassName="w-full"
        aside={
          <div className="editorial-card-dark surface-ocean p-5 md:p-7">
            <div className="icon-badge-ocean mb-4 h-14 w-14">
              <FileText size={24} />
            </div>
            <p className="font-heading text-2xl font-semibold tracking-normal text-white md:text-3xl">
              Regulamin PDF
            </p>
            <p className="mt-3 text-sm leading-6 text-white/74 md:text-base">
              Otwórz dokument w przeglądarce albo pobierz go na swoje urządzenie.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a href={regulaminPdfSrc} target="_blank" rel="noopener noreferrer" className="cta-inverse flex-1">
                <ExternalLink size={18} />
                Otwórz PDF
              </a>
              <a href={regulaminPdfSrc} download className="cta-secondary flex-1 border-white/25 bg-white/10 text-white hover:bg-white hover:text-foreground">
                <Download size={18} />
                Pobierz
              </a>
            </div>
          </div>
        }
      />

      <section className="px-2 pb-10 pt-2.5 md:px-4 md:pb-16">
        <div className="container mx-auto">
          <Reveal className="editorial-card p-2 md:p-3">
            <div className="overflow-hidden rounded-[0.95rem] border border-foreground/10 bg-white shadow-[0_24px_70px_rgba(15,42,61,0.14)] md:rounded-[1.25rem]">
              <iframe
                title="Regulamin Deskorelax"
                src={regulaminPdfSrc}
                className="h-[72vh] min-h-[34rem] w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Regulamin;
