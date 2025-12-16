"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth scroll setup
export const initSmoothScroll = () => {
  if (typeof window === "undefined") return;

  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";
  
  // GSAP smooth scroll (optional, can be enabled if needed)
  // gsap.to(window, {
  //   duration: 1,
  //   scrollTo: { y: 0 },
  //   ease: "power2.inOut",
  // });
};

// Parallax effect for background elements
export const parallaxBackground = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Fade in animation with scroll trigger
export const fadeInUp = (
  element: HTMLElement | HTMLElement[],
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) => {
  const {
    delay = 0,
    duration = 1,
    stagger = 0,
    start = "top 85%",
  } = options;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: Array.isArray(element) ? element[0] : element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Scale animation
export const scaleIn = (
  element: HTMLElement | HTMLElement[],
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.8, stagger = 0 } = options;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: Array.isArray(element) ? element[0] : element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Slide in from sides
export const slideIn = (
  element: HTMLElement,
  direction: "left" | "right" = "left",
  options: { delay?: number; duration?: number } = {}
) => {
  const { delay = 0, duration = 1 } = options;
  const xValue = direction === "left" ? -100 : 100;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: xValue,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Text reveal animation
export const textReveal = (element: HTMLElement) => {
  const text = element.textContent || "";
  element.innerHTML = "";

  const chars = text.split("").map((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
    return span;
  });

  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 50,
      rotationX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Navbar animation on scroll
export const animateNavbarOnScroll = (navbar: HTMLElement) => {
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    toggleClass: {
      className: "scrolled",
      targets: navbar,
    },
  });

  gsap.fromTo(
    navbar,
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }
  );
};

// Parallax for multiple layers
export const createParallaxLayers = (
  layers: Array<{ element: HTMLElement; speed: number }>
) => {
  layers.forEach(({ element, speed }) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.closest("section") || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

// Magnetic effect for buttons
export const magneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// Cleanup all ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

