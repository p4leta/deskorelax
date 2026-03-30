import Layout from "@/components/Layout";
import { Instagram } from "lucide-react";

const Gallery = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="subpage-title-kretowiny text-4xl md:text-5xl font-extrabold text-center mb-6">
            Galeria 📸
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Zobacz nasze najlepsze chwile na wodzie! Śledź nas na Instagramie po więcej.
          </p>

          {/* Instagram embed grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Instagram post embeds - using placeholder iframes */}
            {[
              "C_example1",
              "C_example2",
              "C_example3",
              "C_example4",
              "C_example5",
              "C_example6",
            ].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-card rounded-xl border border-border flex items-center justify-center text-muted-foreground"
              >
                <div className="text-center p-4">
                  <Instagram size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs opacity-60">Post z Instagrama #{i + 1}</p>
                  <p className="text-xs opacity-40 mt-1">Embed zostanie dodany</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to Instagram */}
          <div className="text-center">
            <a
              href="https://www.instagram.com/deskorelax/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              <Instagram size={20} /> Zobacz więcej na Instagramie
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
