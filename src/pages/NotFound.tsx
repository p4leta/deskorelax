import Layout from "@/components/Layout";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="px-4 pb-16 pt-3 md:pt-36">
        <div className="container mx-auto">
          <div className="section-shell mx-auto max-w-4xl px-6 py-12 text-center md:px-10 md:py-16">
            <span className="eyebrow">404 / Lost at sea</span>
            <h1 className="display-title mt-8 text-[clamp(4rem,12vw,8rem)] text-foreground">Nie znaleziono strony</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Wygląda na to, że ta trasa odpłynęła. Wróć na stronę główną i popłyńmy dalej właściwym kursem.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="cta-primary">
                Wróć na stronę główną
              </Link>
              <Link to="/kontakt" className="cta-secondary">
                Skontaktuj się z nami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
