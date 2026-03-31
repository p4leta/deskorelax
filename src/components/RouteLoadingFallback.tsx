const RouteLoadingFallback = () => {
  return (
    <div className="site-shell flex min-h-screen items-center justify-center px-6">
      <div className="section-shell surface-wash flex items-center gap-3 px-4 py-3 text-foreground shadow-[0_20px_50px_rgba(15,32,46,0.08)]">
        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <p className="text-sm font-medium tracking-[0.02em] text-foreground/72">Ładowanie strony</p>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
