import { Wind } from "lucide-react";
import { motion } from "framer-motion";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";
import PrefetchLink from "@/components/PrefetchLink";
import homeHeroImage from "@/assets/hero-home-new.jpg";

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.095,
      delayChildren: 0.08,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
  },
};

const HomeHeroSection = () => {
  return (
    <section className="section-frame section-frame-seamless overflow-hidden px-2 pb-8 pt-3 md:px-4 md:pb-20 md:pt-10">
      <div className="container mx-auto">
        <motion.div
          className="media-frame min-h-[520px] md:min-h-[680px]"
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={homeHeroImage}
            alt="Deskorelax przy jeziorze o zachodzie slonca"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.025 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,27,40,0.06)_0%,rgba(10,27,40,0.22)_42%,rgba(10,27,40,0.58)_100%)]" />
          <div className="lake-ripple" />

          <motion.div
            className="relative flex min-h-[520px] flex-col justify-center px-4 py-5 text-center md:min-h-[680px] md:px-10 md:py-10 lg:px-14 lg:py-12"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-7 md:gap-9">
              <motion.img
                variants={heroItem}
                src="/hero/kretowiny-wordmark-full.png"
                alt="Szkola windsurfingu i zeglarstwa Kretowiny"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full max-w-[76rem] drop-shadow-[0_18px_46px_rgba(8,24,36,0.44)]"
              />

              <motion.div variants={heroItem} className="flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
                <PrefetchLink to="/oferta" className="cta-primary min-h-12 px-6 text-sm md:min-h-14 md:px-8 md:text-base">
                  <Wind size={20} />
                  Sprawdź ofertę
                </PrefetchLink>
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary min-h-12 px-6 text-sm md:min-h-14 md:px-8 md:text-base"
                >
                  <InstagramBrandIcon size={20} />
                  Zobacz Instagram
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
