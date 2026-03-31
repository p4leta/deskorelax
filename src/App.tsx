import RouteLoadingFallback from "@/components/RouteLoadingFallback";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routeLoaders, scheduleIdleRoutePrefetch } from "@/lib/route-prefetch";
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

    return scheduleIdleRoutePrefetch(["/oferta", "/o-nas", "/kontakt", "/spot"]);
  }, [pathname]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <RoutePrefetchWarmup />
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/oferta" element={<Offer />} />
        <Route path="/spot" element={<Spot />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/wyjazdy" element={<Trips />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
