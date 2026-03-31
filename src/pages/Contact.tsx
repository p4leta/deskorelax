import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

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
    icon: <Instagram size={22} />,
    title: "Instagram",
    content: "@deskorelax",
    href: "https://www.instagram.com/deskorelax/",
  },
];

const contactVariants = [
  {
    card: "editorial-card surface-seafoam",
    icon: "icon-badge-seafoam text-primary",
    eyebrow: "text-foreground/42",
    title: "text-foreground",
  },
  {
    card: "editorial-card surface-sunset",
    icon: "icon-badge-sunset",
    eyebrow: "text-foreground/42",
    title: "text-foreground",
  },
  {
    card: "editorial-card",
    icon: "icon-badge-seafoam text-primary",
    eyebrow: "text-foreground/42",
    title: "text-foreground",
  },
  {
    card: "editorial-card-dark surface-ocean",
    icon: "icon-badge-ocean",
    eyebrow: "text-white/45",
    title: "text-white",
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

      <section className="px-4 py-4 md:py-8 md:pb-16">
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactItems.map((item, index) => {
              const variant = contactVariants[index];

              return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${variant.card} block p-7 transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className={`mb-5 h-14 w-14 ${variant.icon}`}>
                  {item.icon}
                </div>
                <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${variant.eyebrow}`}>{item.title}</p>
                <p className={`mt-4 font-heading text-2xl font-semibold tracking-[-0.04em] ${variant.title}`}>
                  {item.content}
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
