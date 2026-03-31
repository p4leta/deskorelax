import { Link } from "react-router-dom";
import { Wind } from "lucide-react";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";
import homeHeroImage from "@/assets/hero-home-new.jpg";

const HomeHeroSection = () => {
  return (
    <section className="section-frame section-frame-seamless overflow-hidden px-2 pb-8 pt-3 md:px-4 md:pb-20 md:pt-12">
      <div className="container mx-auto">
        <div className="media-frame min-h-[420px] md:min-h-[640px]">
          <img
            src={homeHeroImage}
            alt="Deskorelax przy jeziorze o zachodzie slonca"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,42,0.18)_0%,rgba(12,28,42,0.42)_100%)]" />
          <div className="ambient-blob right-12 top-10 h-36 w-36 bg-sunset/25" />
          <div className="ambient-blob bottom-10 left-10 h-44 w-44 bg-ocean-light/25" />

          <div className="relative flex min-h-[420px] flex-col items-center justify-center px-3 py-6 text-center md:min-h-[640px] md:px-10 md:py-14 lg:px-14 lg:py-16">
            <div className="space-y-6 md:space-y-8">
              <img
                src="/hero/kretowiny-wordmark-full.png"
                alt="Szkola windsurfingu i zeglarstwa Kretowiny"
                loading="eager"
                decoding="async"
                className="h-auto w-full max-w-[46rem] drop-shadow-[0_16px_40px_rgba(13,27,39,0.34)]"
              />

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/oferta" className="cta-primary">
                  <Wind size={18} />
                  Sprawdź ofertę
                </Link>
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary"
                >
                  <InstagramBrandIcon size={18} />
                  Zobacz Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
