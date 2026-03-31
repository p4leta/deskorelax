import type { FocusEvent, MouseEvent, TouchEvent } from "react";
import { Link, type LinkProps, type To } from "react-router-dom";
import { prefetchRoute } from "@/lib/route-prefetch";

type PrefetchLinkProps = LinkProps;

const getPathname = (to: To) => {
  if (typeof to === "string") {
    return to;
  }

  return to.pathname ?? "";
};

const PrefetchLink = ({
  to,
  onFocus,
  onMouseEnter,
  onTouchStart,
  ...props
}: PrefetchLinkProps) => {
  const pathname = getPathname(to);

  const handlePrefetch = () => {
    if (pathname) {
      prefetchRoute(pathname);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onFocus?.(event);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onMouseEnter?.(event);
  };

  const handleTouchStart = (event: TouchEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onTouchStart?.(event);
  };

  return (
    <Link
      to={to}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      {...props}
    />
  );
};

export default PrefetchLink;
