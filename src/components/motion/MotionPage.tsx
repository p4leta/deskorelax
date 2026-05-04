import { motion, type Variants } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0.98,
    transition: { duration: 0.04, ease: "linear" },
  },
};

type MotionPageProps = {
  children: ReactNode;
  className?: string;
};

const MotionPage = forwardRef<HTMLDivElement, MotionPageProps>(({ children, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ contain: "paint" }}
    >
      {children}
    </motion.div>
  );
});

MotionPage.displayName = "MotionPage";

export default MotionPage;
