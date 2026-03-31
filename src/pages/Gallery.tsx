import Layout from "@/components/Layout";
import { Instagram } from "lucide-react";

const galleryVariants = [
  "editorial-card surface-seafoam",
  "editorial-card surface-sunset",
  "editorial-card",
  "editorial-card surface-sunset",
  "editorial-card surface-seafoam",
  "editorial-card-dark surface-ocean",
];

const Gallery = () => {
  return (
    <Layout>
      <section className="px-4 pb-16 pt-32 md:pt-40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {["01", "02", "03", "04", "05", "06"].map((item, index) => (
              <article
                key={item}
                className={`${galleryVariants[index]} flex aspect-square flex-col items-center justify-center p-7 text-center`}
              >
                <Instagram size={34} className={index === 5 ? "text-white/82" : "text-foreground/38"} />
                <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.28em] ${index === 5 ? "text-white/58" : "text-foreground/42"}`}>
                  Post {item}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/deskorelax/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-20 w-full max-w-[500px] items-center justify-center gap-4 rounded-full border border-[rgba(255,255,255,0.16)] bg-[#384958] px-8 py-5 text-center font-heading text-2xl font-semibold tracking-[-0.03em] text-white shadow-[0_18px_50px_rgba(14,26,37,0.32)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#415465]"
              style={{ backgroundColor: "#384958", color: "#ffffff" }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)]">
                <Instagram size={24} />
              </span>
              <span>Zobacz więcej na Instagramie</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
