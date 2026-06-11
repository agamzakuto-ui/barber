"use client";

import { MotionConfig } from "motion/react";

/**
 * Forces consistent animations across every device.
 *
 * By default Framer Motion honours the OS "Reduce Motion" preference, which is
 * frequently enabled on phones (and is forced on by iOS Low Power Mode). That
 * makes entrance animations look flat on mobile while they play fully on a
 * desktop where the setting is off. `reducedMotion="never"` opts out of that so
 * the experience matches the desktop build everywhere.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
