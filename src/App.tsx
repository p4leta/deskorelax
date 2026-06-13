import RouteLoadingFallback from "@/components/RouteLoadingFallback";
import Layout from "@/components/Layout";
import MotionPage from "@/components/motion/MotionPage";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routeLoaders, scheduleFullAppWarmup } from "@/lib/route-prefetch";
import Index from "./pages/Index";
const About = lazy(routeLoaders["/o-nas"]);
const Offer = lazy(routeLoaders["/oferta"]);
const Spot = lazy(routeLoaders["/spot"]);
const Gallery = lazy(routeLoaders["/galeria"]);
const Contact = lazy(routeLoaders["/kontakt"]);
const Trips = lazy(routeLoaders["/wyjazdy"]);
const Regulamin = lazy(routeLoaders["/regulamin"]);
const Cennik = lazy(routeLoaders["/cennik"]);
const NotFound = lazy(routeLoaders["*"]);

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousRootScrollBehavior = root.style.scrollBehavior;
    const previousBodyScrollBehavior = document.body.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    const scrollTop = () => {
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    let secondFrame = 0;
    const restoreScrollBehavior = () => {
      root.style.scrollBehavior = previousRootScrollBehavior;
      document.body.style.scrollBehavior = previousBodyScrollBehavior;
    };

    scrollTop();
    const firstFrame = window.requestAnimationFrame(() => {
      scrollTop();
      secondFrame = window.requestAnimationFrame(() => {
        scrollTop();
        restoreScrollBehavior();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      restoreScrollBehavior();
    };
  }, [pathname, search]);

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
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/cennik" element={<Cennik />} />
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
