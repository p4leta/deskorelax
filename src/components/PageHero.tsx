import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
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
  eyebrow,
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
    <section className={cn("section-frame pt-3 pb-8 md:pt-36 md:pb-12", className)}>
      <div className="container mx-auto md:px-4">
        <div className={cn("subpage-hero", panelClassName)}>
          <div className="ambient-blob -left-16 top-12 h-44 w-44 bg-sunset/20" />
          <div className="ambient-blob bottom-0 right-0 h-56 w-56 bg-primary/20" />

          <div className={cn("subpage-hero-grid relative", reverseOnDesktop && "lg:grid-cols-[minmax(360px,0.96fr)_minmax(0,1.04fr)]")}>
            <div className={cn("space-y-7", contentClassName)}>
              <div className="space-y-5">
                <h1 className="subpage-title">{title}</h1>
                <p className={cn("max-w-2xl text-base leading-7 text-muted-foreground md:text-lg", descriptionClassName)}>
                  {description}
                </p>
              </div>
            </div>

            {aside ? (
              <div
                className={cn(
                  "relative lg:justify-self-end",
                  reverseOnDesktop && "lg:order-first lg:justify-self-start",
                  asideClassName,
                )}
              >
                {aside}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
