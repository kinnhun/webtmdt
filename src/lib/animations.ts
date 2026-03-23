/**
 * Shared Framer Motion animation variants for the entire site.
 * Premium "Editorial Luxury" feel — smooth, calm, understated.
 */

export const ease = [0.16, 1, 0.3, 1] as const;
export const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const stagger = (delay = 0, staggerChildren = 0.1) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delay,
    },
  },
});

export const sectionReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

export const cardReveal = (i: number) => ({
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay: i * 0.09, ease },
});

export const lineExpand = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease },
  },
};

export const counterReveal = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay: 0.2 + i * 0.1, ease },
});
