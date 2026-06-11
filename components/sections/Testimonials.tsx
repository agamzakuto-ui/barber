import { testimonials } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { StarIcon } from "@/components/icons";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-primary py-24 text-primary-foreground sm:py-28">
      <Container>
        <Reveal className="flex max-w-2xl flex-col gap-5">
          <Eyebrow>מה אומרים עלינו</Eyebrow>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            אהובים על מי שיושב אצלנו בכיסא
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name} className="h-full">
              <figure className="flex h-full flex-col gap-6 rounded-2xl border border-primary-foreground/10 bg-background/[0.04] p-8 transition-colors duration-300 hover:border-secondary/40">
                <div className="flex gap-0.5 text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-primary-foreground/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col gap-0.5 border-t border-primary-foreground/10 pt-5">
                  <span className="font-serif text-base font-semibold text-primary-foreground">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-primary-foreground/55">{testimonial.role}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
