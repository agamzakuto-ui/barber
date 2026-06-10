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

/** A small uppercase label with a gold rule, used above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-gold">
      <span aria-hidden className="h-px w-8 bg-gold/60" />
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
      <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-stone sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonVariant = "solid" | "outline";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const buttonVariants: Record<ButtonVariant, string> = {
  solid:
    "bg-ink text-cream hover:bg-gold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20",
  outline:
    "border border-ink/20 text-ink hover:border-gold hover:text-gold hover:-translate-y-0.5",
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
