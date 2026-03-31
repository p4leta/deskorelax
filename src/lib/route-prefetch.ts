type RouteModuleLoader = () => Promise<unknown>;

type PrefetchableRoute =
  | "/o-nas"
  | "/oferta"
  | "/spot"
  | "/galeria"
  | "/wyjazdy"
  | "/kontakt"
  | "*";

const routeModuleLoaders: Record<PrefetchableRoute, RouteModuleLoader> = {
  "/o-nas": () => import("../pages/About"),
  "/oferta": () => import("../pages/Offer"),
  "/spot": () => import("../pages/Spot"),
  "/galeria": () => import("../pages/Gallery"),
  "/wyjazdy": () => import("../pages/Trips"),
  "/kontakt": () => import("../pages/Contact"),
  "*": () => import("../pages/NotFound"),
};

const prefetchedRoutes = new Set<PrefetchableRoute>();

export const routeLoaders = routeModuleLoaders;

export const getPrefetchableRoute = (path: string): PrefetchableRoute | null => {
  if (path in routeModuleLoaders) {
    return path as PrefetchableRoute;
  }

  return null;
};

export const prefetchRoute = (path: string) => {
  const route = getPrefetchableRoute(path);

  if (!route || prefetchedRoutes.has(route)) {
    return;
  }

  prefetchedRoutes.add(route);
  routeModuleLoaders[route]().catch(() => {
    prefetchedRoutes.delete(route);
  });
};

export const scheduleIdleRoutePrefetch = (paths: string[]) => {
  const runPrefetch = () => {
    paths.forEach((path) => prefetchRoute(path));
  };

  if (typeof window === "undefined") {
    return () => undefined;
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(runPrefetch, { timeout: 1800 });

    return () => {
      window.cancelIdleCallback(idleId);
    };
  }

  const timeoutId = window.setTimeout(runPrefetch, 900);

  return () => {
    window.clearTimeout(timeoutId);
  };
};
