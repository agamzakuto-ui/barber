"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { hero, about } from "@/lib/site";
import { Container, ButtonLink } from "@/components/ui";
import { ArrowRightIcon, StarIcon } from "@/components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream pt-[var(--spacing-header)]"
    >
      {/* Soft decorative wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-7"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-gold"
          >
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {hero.titleTop}
            <span className="mt-2 block font-serif italic text-gold">
              {hero.titleBottom}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md text-base leading-relaxed text-stone sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRightIcon className="h-4 w-4 -scale-x-100 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-4 grid w-full max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6"
          >
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-xs uppercase tracking-wide text-stone">
                  {stat.label}
                </dt>
                <dd className="order-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-[2rem] border border-gold/40"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl border border-ink/5 bg-cream/95 px-5 py-4 shadow-xl shadow-ink/10 backdrop-blur sm:-start-6"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">דירוג 4.9 / 5</p>
              <p className="text-xs text-stone">800+ ביקורות חמישה כוכבים</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
