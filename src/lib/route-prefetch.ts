import aboutHeroWindsurf from "@/assets/about-hero-windsurf.jpg";
import spotHeroMap from "@/assets/spot-hero-map.jpg";

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
const prefetchedAssets = new Set<string>();

const routeCriticalAssets: Partial<Record<PrefetchableRoute, string[]>> = {
  "/o-nas": [aboutHeroWindsurf],
  "/spot": [spotHeroMap],
};

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

export const preloadAsset = (assetUrl: string) => {
  if (!assetUrl || prefetchedAssets.has(assetUrl)) {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = assetUrl;
  prefetchedAssets.add(assetUrl);
};

export const preloadCriticalAssetsForRoute = (path: string) => {
  const route = getPrefetchableRoute(path);

  if (!route) {
    return;
  }

  (routeCriticalAssets[route] ?? []).forEach((assetUrl) => preloadAsset(assetUrl));
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

const runAfterIdle = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: 2400 });

    return () => {
      window.cancelIdleCallback(idleId);
    };
  }

  const timeoutId = window.setTimeout(callback, 1200);

  return () => {
    window.clearTimeout(timeoutId);
  };
};

const allPrefetchableRoutes: PrefetchableRoute[] = [
  "/o-nas",
  "/oferta",
  "/spot",
  "/galeria",
  "/wyjazdy",
  "/kontakt",
  "*",
];

let appWarmupScheduled = false;

export const scheduleFullAppWarmup = () => {
  if (typeof window === "undefined" || appWarmupScheduled) {
    return () => undefined;
  }

  appWarmupScheduled = true;
  let clearAssetWarmup = () => undefined;

  const clearRouteWarmup = runAfterIdle(() => {
    Promise.all(allPrefetchableRoutes.map((route) => routeModuleLoaders[route]().catch(() => undefined))).finally(() => {
      clearAssetWarmup = runAfterIdle(() => {
        allPrefetchableRoutes.forEach((route) => preloadCriticalAssetsForRoute(route));
      });
    });
  });

  return () => {
    clearRouteWarmup();
    clearAssetWarmup();
  };
};
