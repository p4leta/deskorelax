import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
} & ComponentPropsWithoutRef<"div"> &
  Record<string, unknown>;

const Reveal = ({ children, as = "div", className, delay = 0, once = true, ...props }: RevealProps) => {
  const Component = motion.create(as);

  return (
    <Component
      {...props}
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.18, margin: "0px 0px -80px 0px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
