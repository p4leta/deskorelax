import { Mail, MapPin, Phone } from "lucide-react";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";

const contactItems = [
  {
    icon: <Phone size={22} />,
    title: "Telefon",
    content: "+48 726 165 824",
    href: "tel:+48726165824",
    accent: "text-[#1f75ad]",
  },
  {
    icon: <Mail size={22} />,
    title: "Email",
    content: "deskorelaxkretowiny@gmail.com",
    href: "mailto:deskorelaxkretowiny@gmail.com",
    accent: "text-[#e36f2c]",
  },
  {
    icon: <MapPin size={22} />,
    title: "Adres",
    content: "Kretowiny 28F, 14-300 Kretowiny",
    href: googleMapsLink,
    accent: "text-[#174f7f]",
  },
  {
    icon: <InstagramBrandIcon size={22} />,
    title: "Instagram",
    content: "@deskorelax",
    href: "https://www.instagram.com/deskorelax/",
    accent: "text-[#e7b93f]",
  },
];

const Contact = () => {
  return (
    <>
      <PageHero
        title="Napisz lub zadzwoń"
        description="Masz pytania, chcesz zarezerwować kurs albo sprawdzić terminy? Odezwij się do nas."
        className="pb-0 md:pb-0 [&_.subpage-hero]:pb-3 md:[&_.subpage-hero]:pb-5"
        panelClassName="surface-sunset"
        descriptionClassName="max-w-none md:whitespace-nowrap"
      />

      <section className="px-2 pb-10 pt-0 md:px-4 md:pb-16 md:pt-0">
        <div className="container mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {contactItems.map((item) => {
              return (
                <Reveal
                  key={item.title}
                  className="h-full transform-gpu"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="premium-link-card block h-full rounded-[1rem] border border-[rgba(32,110,175,0.16)] bg-[rgba(255,255,255,0.72)] p-4 text-left shadow-[0_20px_60px_rgba(19,32,51,0.1)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[rgba(227,111,44,0.28)] hover:shadow-[0_22px_70px_rgba(227,111,44,0.14)] md:rounded-[1.25rem] md:p-7"
                  >
                    <div className={`icon-badge-seafoam mb-3.5 h-11 w-11 bg-white/65 md:mb-5 md:h-14 md:w-14 ${item.accent}`}>{item.icon}</div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#132033]/45 md:text-xs">
                      {item.title}
                    </p>
                    <p className="mt-2 font-heading text-[0.84rem] font-semibold tracking-normal text-[#132033] md:mt-4 md:text-2xl">
                      {item.title === "Email" ? (
                        <>
                          deskorelaxkretowiny
                          <wbr />
                          @gmail.com
                        </>
                      ) : (
                        item.content
                      )}
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
