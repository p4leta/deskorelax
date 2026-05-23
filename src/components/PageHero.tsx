import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

type PageHeroProps = {
  title: string;
  description: string;
  aside?: ReactNode;
  className?: string;
  panelClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  asideClassName?: string;
  reverseOnDesktop?: boolean;
};

const PageHero = ({
  title,
  description,
  aside,
  className,
  panelClassName,
  descriptionClassName,
  contentClassName,
  asideClassName,
  reverseOnDesktop = false,
}: PageHeroProps) => {
  return (
    <section className={cn("section-frame section-frame-seamless pt-3 pb-8 md:pt-12 md:pb-12", className)}>
      <div className="container mx-auto md:px-4">
        <Reveal className={cn("subpage-hero", panelClassName)}>
          <div className={cn("subpage-hero-grid relative", reverseOnDesktop && "lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1.18fr)]")}>
            <div className={cn("w-full min-w-0 space-y-7", contentClassName)}>
              <div className="space-y-5">
                <h1 className="subpage-title">{title}</h1>
                <p className={cn("max-w-2xl break-words text-base leading-7 text-muted-foreground md:text-lg", descriptionClassName)}>
                  {description}
                </p>
              </div>
            </div>

            {aside ? (
              <div
                className={cn(
                  "relative min-w-0 lg:justify-self-end",
                  reverseOnDesktop && "lg:order-first lg:justify-self-start",
                  asideClassName,
                )}
              >
                {aside}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PageHero;
