"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { brand, navItems } from "@/lib/site";
import { ScissorsIcon } from "@/components/icons";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a
      href="#home"
      aria-label={`${brand.fullName} — חזרה לראש העמוד`}
      className={`group flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-2.5 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
        <ScissorsIcon className="h-4 w-4" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-ink">
          {brand.name}
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-stone">
          עיצוב שיער
        </span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(navItems[0]?.id ?? "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cream/85 backdrop-blur-md shadow-sm shadow-ink/5"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="ניווט ראשי"
        className="mx-auto flex min-h-[var(--spacing-header)] w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 sm:px-8 lg:flex-nowrap lg:gap-y-0 lg:py-0"
      >
        <Wordmark className="order-1" />

        <a
          href="#contact"
          className="order-2 ms-auto inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-cream transition-all duration-300 hover:bg-gold hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream lg:order-3 lg:ms-0 lg:px-5 lg:py-2.5 lg:text-sm"
        >
          לקביעת תור
        </a>

        <ul className="order-3 flex w-full items-center justify-between gap-0.5 lg:order-2 lg:w-auto lg:flex-1 lg:justify-center lg:gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block whitespace-nowrap rounded-full px-1.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 lg:px-4 lg:py-2 lg:text-sm ${
                    isActive ? "text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-1.5 -bottom-0.5 h-px bg-gold lg:inset-x-3"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
