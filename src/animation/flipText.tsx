import { motion } from "framer-motion";
import { ReactNode } from "react";

export const FlipIcons = (props: {
  children: ReactNode;
  infinit?: boolean;
}) => {
  const DURATION = 0.2;
  const STAGGER = 0.2;
  return (
    <motion.span
      initial="initial"
      whileHover="animate"
      style={{
        cursor: "pointer",
        position: "relative",
        display: "block",
        overflow: "hidden",
      }}
    >
      <motion.div
        variants={{ initial: { y: 0 }, animate: { y: "-100%" } }}
        transition={{
          duration: DURATION,
          ease: "easeInOut",
          repeat: props.infinit ? Infinity : 0,
          repeatType: "mirror",
          delay: STAGGER,
        }}
      >
        {props.children}
      </motion.div>
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        variants={{ initial: { y: "100%" }, animate: { y: 0 } }}
        transition={{
          duration: DURATION,
          ease: "easeInOut",
          repeat: props.infinit ? Infinity : 0,
          repeatType: "mirror",
          delay: STAGGER,
        }}
      >
        {props.children}
      </motion.div>
    </motion.span>
  );
};
