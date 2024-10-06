import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHieght, setContentHieght] = useState(0);
  const [windowHieght, setwindowHieght] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current != null) {
        setContentHieght(ref.current.scrollHeight);
      }
      setwindowHieght(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, [ref]);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });
  const y = useTransform(smoothProgress, (value) => {
    return value * -(contentHieght - windowHieght);
  });
  return (
    <>
      <div style={{ height: contentHieght }} />
      <motion.div ref={ref} style={{ position: "fixed", top: 0, y: y }}>
        {children}
      </motion.div>
    </>
  );
};
