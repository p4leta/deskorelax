const RouteLoadingFallback = () => {
  return (
    <div className="site-shell flex min-h-screen items-center justify-center px-6">
      <div className="section-shell surface-wash flex items-center gap-4 px-5 py-4 text-foreground shadow-[0_20px_50px_rgba(15,32,46,0.1)]">
        <img
          src="/deskorelax-logo.png"
          alt="Deskorelax logo"
          loading="eager"
          decoding="async"
          className="h-11 w-11 rounded-full object-contain"
        />
        <div>
          <p className="font-heading text-lg font-semibold tracking-[-0.04em]">Deskorelax</p>
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">Ladowanie strony</p>
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
