import { Link } from "react-router-dom";
import { Instagram, Wind, Waves, Sun } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-dark via-ocean to-secondary py-24 md:py-36">
        <div className="absolute inset-0 opacity-10 text-7xl leading-loose tracking-widest pointer-events-none select-none overflow-hidden">
          🏄 🌊 🌴 ☀️ 🏄‍♂️ 🌊 🌴 ☀️ 🏄 🌊 🌴 ☀️
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <img alt="Deskorelax" className="h-20 md:h-28 mx-auto" src="/lovable-uploads/2559f7b4-f1f8-459a-abdf-7b73bdb3729c.png" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Deskorelax 🏄‍♂️
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-8 max-w-2xl mx-auto">
            Szkoła windsurfingowa — złap wiatr, poczuj wolność!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/oferta"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">

              <Wind size={18} /> Sprawdź ofertę
            </Link>
            <a
              href="https://www.instagram.com/deskorelax/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition-colors">

              <Instagram size={18} /> Śledź nas na IG
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Dlaczego Deskorelax? 🌊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            { icon: <Wind size={36} />, title: "Doświadczeni instruktorzy", desc: "Nasz zespół to pasjonaci windsurfingu z wieloletnim doświadczeniem." },
            { icon: <Waves size={36} />, title: "Idealny spot", desc: "Doskonałe warunki wiatrowe i bezpieczne akweny dla początkujących i zaawansowanych." },
            { icon: <Sun size={36} />, title: "Luźna atmosfera", desc: "U nas relaks jest najważniejszy — surfing to przede wszystkim zabawa!" }].
            map((item, i) =>
            <div
              key={i}
              className="bg-card rounded-xl p-8 text-center shadow-sm border border-border hover:shadow-md transition-shadow">

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Gotowy na przygodę? ☀️
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Dołącz do naszej szkoły i naucz się windsurfingu w najlepszej atmosferze!
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">

            Skontaktuj się z nami 🤙
          </Link>
        </div>
      </section>
    </Layout>);

};

export default Index;