import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className,
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={cn("space-y-5", centered && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <div className={cn("flex items-center gap-4", centered && "justify-center")}>
          <span className={cn("eyebrow", invert && "eyebrow-dark")}>{eyebrow}</span>
          {!centered && <span className="kicker-line" />}
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className={cn(invert ? "section-title text-white" : "section-title")}>{title}</h2>
        {description ? (
          <p className={cn("section-lead", invert && "text-white/72", centered && "mx-auto")}>{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeading;
