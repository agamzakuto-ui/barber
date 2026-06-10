import { contact } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion/primitives";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="bg-sand/50 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <dl className="flex flex-col gap-5">
              {contact.details.map((detail) => (
                <div key={detail.label} className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    {detail.label}
                  </dt>
                  <dd className="text-base text-ink">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="transition-colors hover:text-gold"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3 border-t border-ink/10 pt-6">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                שעות פעילות
              </span>
              <ul className="flex flex-col gap-2">
                {contact.hours.map((slot) => (
                  <li
                    key={slot.day}
                    className="flex items-center justify-between text-sm text-stone"
                  >
                    <span>{slot.day}</span>
                    <span className="font-medium text-ink">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.05}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
