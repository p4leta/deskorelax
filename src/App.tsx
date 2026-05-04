import RouteLoadingFallback from "@/components/RouteLoadingFallback";
import Layout from "@/components/Layout";
import MotionPage from "@/components/motion/MotionPage";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routeLoaders, scheduleFullAppWarmup } from "@/lib/route-prefetch";
import Index from "./pages/Index";
const About = lazy(routeLoaders["/o-nas"]);
const Offer = lazy(routeLoaders["/oferta"]);
const Spot = lazy(routeLoaders["/spot"]);
const Gallery = lazy(routeLoaders["/galeria"]);
const Contact = lazy(routeLoaders["/kontakt"]);
const Trips = lazy(routeLoaders["/wyjazdy"]);
const NotFound = lazy(routeLoaders["*"]);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const RoutePrefetchWarmup = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    return scheduleFullAppWarmup();
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <MotionPage key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/oferta" element={<Offer />} />
          <Route path="/spot" element={<Spot />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/wyjazdy" element={<Trips />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MotionPage>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <RoutePrefetchWarmup />
    <Layout>
      <Suspense fallback={<RouteLoadingFallback />}>
        <AnimatedRoutes />
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default App;
