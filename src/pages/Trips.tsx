import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const Trips = () => {
  return (
    <Layout>
      <PageHero
        title="Już wkrótce"
        description="Pierwsze wyjazdy z Deskorelax są w przygotowaniu."
        panelClassName="surface-sunset"
        className="pb-16 md:pb-20"
      />
    </Layout>
  );
};

export default Trips;
