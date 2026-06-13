import Reveal from "@/components/motion/Reveal";

const regulaminPdfSrc = "/regulamin.pdf";

const Regulamin = () => {
  return (
    <>
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
