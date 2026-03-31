import RouteLoadingFallback from "@/components/RouteLoadingFallback";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Offer = lazy(() => import("./pages/Offer"));
const Spot = lazy(() => import("./pages/Spot"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Trips = lazy(() => import("./pages/Trips"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
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
