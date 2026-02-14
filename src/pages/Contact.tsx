import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-6">
            Kontakt 🤙
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Masz pytania? Chcesz zarezerwować kurs? Skontaktuj się z nami!
          </p>

          <div className="bg-card rounded-xl border border-border p-8 md:p-12 max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Telefon</h3>
                  <p className="text-muted-foreground">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">kontakt@deskorelax.pl</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Adres</h3>
                  <p className="text-muted-foreground">Polska (dokładny adres wkrótce)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center flex-shrink-0">
                  <Instagram size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Instagram</h3>
                  <a
                    href="https://www.instagram.com/deskorelax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline"
                  >
                    @deskorelax
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
