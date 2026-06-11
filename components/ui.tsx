import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion/primitives";

/** Centered, padded content wrapper used by every section. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** A small uppercase label with a decorative rule, used above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-secondary">
      <span aria-hidden className="h-px w-8 bg-secondary/60" />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Consistent section header: eyebrow + serif title + supporting copy. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-start";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonVariant = "solid" | "outline" | "cta";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const buttonVariants: Record<ButtonVariant, string> = {
  // Booking CTA — coral, the loudest action on the page.
  cta:
    "bg-accent text-accent-foreground hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30",
  // Primary action — plum.
  solid:
    "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20",
  outline:
    "border border-border text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5",
};

/** Pill-shaped link styled as a primary or secondary call-to-action. */
export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
