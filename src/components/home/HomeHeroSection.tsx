import { Sailboat } from "lucide-react";
import { motion } from "framer-motion";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";
import PrefetchLink from "@/components/PrefetchLink";

const heroImage = "/generated/hero-home-1600.jpg";
const heroImageSrcSet = [
  "/generated/hero-home-960.jpg 960w",
  "/generated/hero-home-1600.jpg 1600w",
  "/generated/hero-home-2400.jpg 2400w",
].join(", ");

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
    <section className="section-frame section-frame-seamless overflow-hidden px-0 pb-0 pt-0 md:px-0 md:pb-0 md:pt-0">
      <div className="mx-auto">
        <motion.div
          className="relative min-h-[112vh] overflow-hidden md:min-h-[860px]"
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={heroImage}
            srcSet={heroImageSrcSet}
            sizes="(min-width: 1280px) 1184px, (min-width: 768px) calc(100vw - 2rem), calc(100vw - 1rem)"
            alt="Deskorelax przy jeziorze o zachodzie slonca"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.025 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="relative flex min-h-[112vh] flex-col justify-center px-4 py-28 text-center md:min-h-[860px] md:px-10 md:py-32 lg:px-16"
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
                className="h-auto w-full max-w-[76rem] drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
              />

              <motion.div variants={heroItem} className="flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
                <PrefetchLink
                  to="/oferta"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white bg-white px-6 text-sm font-semibold text-black transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/90 md:min-h-14 md:px-8 md:text-base"
                >
                  <Sailboat size={20} className="text-[#b59b72]" />
                  Kursy i Obozy
                </PrefetchLink>
                <a
                  href="https://www.instagram.com/deskorelax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/40 px-6 text-sm font-semibold text-white backdrop-blur transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-black/50 md:min-h-14 md:px-8 md:text-base"
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
