import InstagramBrandIcon from "@/components/InstagramBrandIcon";
import PageHero from "@/components/PageHero";

const Gallery = () => {
  return (
    <>
      <PageHero
        title="Już wkrótce"
        description="Galeria Deskorelax jest w przygotowaniu. Aktualne zdjęcia i klimat z wody znajdziesz na Instagramie."
        panelClassName="surface-sunset"
        className="pb-6 md:pb-8"
      />

      <section className="px-3 pb-12 md:px-4 md:pb-16">
        <div className="container mx-auto flex justify-center">
          <a
            href="https://www.instagram.com/deskorelax/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-16 w-full max-w-[500px] items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.16)] bg-[#384958] px-6 py-4 text-center font-heading text-[0.88rem] font-semibold tracking-[-0.03em] text-white shadow-[0_18px_50px_rgba(14,26,37,0.32)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#415465] md:min-h-20 md:gap-4 md:px-8 md:py-5 md:text-2xl"
            style={{ backgroundColor: "#384958", color: "#ffffff" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] md:h-12 md:w-12">
              <InstagramBrandIcon size={24} />
            </span>
            <span>Zobacz więcej na Instagramie</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Gallery;
