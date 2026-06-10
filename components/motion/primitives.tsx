"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

/** Shared easing — a refined "ease-out-expo" feel, never bouncy. */
const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 0.25 } as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

type RevealProps = HTMLMotionProps<"div"> & {
  direction?: Direction;
  delay?: number;
  duration?: number;
};

/**
 * Fades + slides its children into view once, when scrolled into the viewport.
 * Respects `prefers-reduced-motion` by dropping the positional offset.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : directionOffset[direction]) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  /** Seconds between each child's entrance. */
  stagger?: number;
  delayChildren?: number;
};

/**
 * Orchestrates a staggered entrance for any nested <StaggerItem /> elements.
 */
export function StaggerGroup({
  children,
  stagger = 0.1,
  delayChildren = 0.05,
  ...rest
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = HTMLMotionProps<"div"> & {
  direction?: Direction;
};

/** A single staggered child. Must live inside a <StaggerGroup />. */
export function StaggerItem({
  children,
  direction = "up",
  ...rest
}: ItemProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : directionOffset[direction]) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
