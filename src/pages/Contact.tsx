import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramBrandIcon from "@/components/InstagramBrandIcon";

const googleMapsLink = "https://maps.app.goo.gl/5q5J3zmwxKsyaU7N6";

const contactItems = [
  {
    icon: <Phone size={22} />,
    title: "Telefon",
    content: "+48 696 246 459",
    href: "tel:+48696246459",
  },
  {
    icon: <Mail size={22} />,
    title: "Email",
    content: "deskorelaxkretowiny@gmail.com",
    href: "mailto:deskorelaxkretowiny@gmail.com",
  },
  {
    icon: <MapPin size={22} />,
    title: "Adres",
    content: "Kretowiny 28F, 14-300 Kretowiny",
    href: googleMapsLink,
  },
  {
    icon: <InstagramBrandIcon size={22} />,
    title: "Instagram",
    content: "@deskorelax",
    href: "https://www.instagram.com/deskorelax/",
  },
];

const Contact = () => {
  return (
    <Layout>
      <PageHero
        eyebrow="Kontakt"
        title="Napisz lub zadzwoń"
        description="Masz pytania, chcesz zarezerwować kurs albo sprawdzić terminy? Odezwij się do nas."
        panelClassName="surface-sunset"
        descriptionClassName="max-w-none md:whitespace-nowrap"
      />

      <section className="px-2 py-2.5 md:px-4 md:py-8 md:pb-16">
        <div className="container mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {contactItems.map((item) => {
              return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="editorial-card-dark surface-ocean block p-4 transition-transform duration-300 hover:-translate-y-1 md:p-7"
              >
                <div className="icon-badge-ocean mb-3.5 h-11 w-11 md:mb-5 md:h-14 md:w-14">
                  {item.icon}
                </div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/80 md:text-xs">{item.title}</p>
                <p className="mt-2 font-heading text-[0.84rem] font-semibold tracking-[-0.04em] !text-white md:mt-4 md:text-2xl">
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
            )})}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
